package com.organizaMoney.service.expenses.infra;

import com.organizaMoney.service.expenses.domain.ExpenseType;
import com.organizaMoney.service.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseTypeRepository extends JpaRepository<ExpenseType, Long> {

    List<ExpenseType> findAllByUser(User user);
}
