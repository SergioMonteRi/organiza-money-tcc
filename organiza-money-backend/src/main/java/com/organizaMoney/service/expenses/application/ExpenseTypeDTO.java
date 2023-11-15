package com.organizaMoney.service.expenses.application;

import com.organizaMoney.service.expenses.domain.ExpenseType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class ExpenseTypeDTO {
    Long id;

    @NotNull
    String name;

    public ExpenseTypeDTO(ExpenseType expenseType){
        this.id = expenseType.getId();
        this.name = expenseType.getName();
    }
}
