package com.organizaMoney.service.expenses.application;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class SpendTypeDTO {
    String expenseType;
    BigDecimal sum;
}
