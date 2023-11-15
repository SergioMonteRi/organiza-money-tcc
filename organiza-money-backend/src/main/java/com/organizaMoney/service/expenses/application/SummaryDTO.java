package com.organizaMoney.service.expenses.application;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class SummaryDTO {
    private BigDecimal sum;
    private BigDecimal max;
    private BigDecimal min;
    private Double avg;
    private Long count;
}
