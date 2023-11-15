package com.organizaMoney.service.expenses.domain;

import com.organizaMoney.service.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "tb_expense_type")
@Entity
@Getter
@Setter
public class ExpenseType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;

    @OneToMany(mappedBy = "expenseType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
