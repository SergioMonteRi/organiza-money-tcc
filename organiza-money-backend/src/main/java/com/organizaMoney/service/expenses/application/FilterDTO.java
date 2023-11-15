package com.organizaMoney.service.expenses.application;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class FilterDTO {
    LocalDate date;
    BigDecimal sum;
    public FilterDTO(LocalDate date, BigDecimal sum){
        this.date = date;
        this.sum = sum;
    }
}
