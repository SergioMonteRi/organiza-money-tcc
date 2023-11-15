package com.organizaMoney.service.expenses.application;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@Setter
@Getter
public class TableDataDTO {
    Long id;
    LocalDate date;
    ExpenseTypeDTO expenseType = new ExpenseTypeDTO();
    BigDecimal spend;
    public TableDataDTO(Long id, LocalDate date, String expenseName, Long expenseId, BigDecimal spend){
        this.id = id;
        this.date = date;
        this.expenseType.setName(expenseName);
        this.expenseType.setId(expenseId);
        this.spend = spend;
    }
}
