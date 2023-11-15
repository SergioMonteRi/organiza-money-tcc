package com.organizaMoney.service.expenses.domain;

import com.organizaMoney.service.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Table(name = "tb_expenses")
@Entity
@Getter
@Setter
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "expense_type_id")
    ExpenseType expenseType;
    LocalDate date;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
    BigDecimal spend;
}
