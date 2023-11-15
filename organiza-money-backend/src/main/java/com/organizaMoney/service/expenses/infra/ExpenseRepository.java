package com.organizaMoney.service.expenses.infra;

import com.organizaMoney.service.expenses.application.FilterDTO;
import com.organizaMoney.service.expenses.application.SpendTypeDTO;
import com.organizaMoney.service.expenses.application.SummaryDTO;
import com.organizaMoney.service.expenses.application.TableDataDTO;
import com.organizaMoney.service.expenses.domain.Expense;
import com.organizaMoney.service.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("SELECT NEW com.organizaMoney.service.expenses.application.FilterDTO(obj.date, SUM(obj.spend))" +
            "FROM Expense AS obj "
            + "WHERE (CAST(:min AS date) IS NULL OR obj.date >= :min) "
            + "AND (CAST(:max AS date) IS NULL OR obj.date <= :max) "
            + "AND (:expenseTypeId IS NULL OR obj.expenseType.id = :expenseTypeId)" +
            " AND obj.user.id = :userId "
            + "GROUP BY obj.date"
    )
    List<FilterDTO> filter(LocalDate min, LocalDate max, Long expenseTypeId, Long userId);

    @Query("SELECT NEW com.organizaMoney.service.expenses.application.TableDataDTO(" +
            "obj.id, " +
            "obj.date, " +
            "obj.expenseType.name, " +
            "obj.expenseType.id, " +
            "obj.spend) " +
            "FROM Expense AS obj "
            + "WHERE (CAST(:min AS date) IS NULL OR obj.date >= :min) "
            + "AND (CAST(:max AS date) IS NULL OR obj.date <= :max) "
            + "AND (:expenseTypeId IS NULL OR obj.expenseType.id = :expenseTypeId)" +
            " AND obj.user.id = :userId "
            + "GROUP BY obj.date, obj.id"
    )
    Page<TableDataDTO> index(LocalDate min, LocalDate max, Long expenseTypeId, Pageable pageable, Long userId);

    @Query("SELECT new com.organizaMoney.service.expenses.application.SummaryDTO(SUM(obj.spend), MAX(obj.spend), MIN(obj.spend), AVG(obj.spend), COUNT(obj.id)) "
            + "FROM Expense AS obj "
            + "WHERE (CAST(:min AS date) IS NULL OR obj.date >= :min) "
            + "AND (CAST(:max AS date) IS NULL OR obj.date <= :max) "
            + "AND (:expenseTypeId IS NULL OR obj.expenseType.id = :expenseTypeId) " +
            " AND obj.user.id = :userId")
    List<SummaryDTO> summary(LocalDate min, LocalDate max, Long expenseTypeId, Long userId);
    @Query("SELECT new com.organizaMoney.service.expenses.application.SpendTypeDTO(obj.expenseType.name, SUM(obj.spend)) "
            + "FROM Expense AS obj "
            + "WHERE (CAST(:min AS date) IS NULL OR obj.date >= :min) " +
            " AND obj.user.id = :userId "
            + "AND (CAST(:max AS date) IS NULL OR obj.date <= :max) " +
            "GROUP BY obj.expenseType.name")
    List<SpendTypeDTO> spendType(LocalDate min, LocalDate max, Long userId );
}
