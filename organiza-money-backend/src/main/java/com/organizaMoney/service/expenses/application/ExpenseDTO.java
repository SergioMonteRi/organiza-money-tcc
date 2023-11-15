package com.organizaMoney.service.expenses.application;

import com.organizaMoney.service.expenses.domain.Expense;
import com.organizaMoney.service.expenses.domain.ExpenseType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ExpenseDTO {
    @NotNull
    LocalDate date;
    @NotNull
    BigDecimal value;
    @NotNull
    ExpenseTypeDTO expenseType;
    public ExpenseDTO(Expense expense){
        this.date = expense.getDate();
        this.value = expense.getSpend();
        this.expenseType = new ExpenseTypeDTO(expense.getExpenseType());
    }
}
