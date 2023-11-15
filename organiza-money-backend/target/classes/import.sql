INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Alex', 'Brown', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('teste', 'Brown', 'teste@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_role (authority) VALUES ('ROLE_USER');
INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_expense_type(user_id, name) VALUES (1, 'Teste 1');
INSERT INTO tb_expense_type(user_id, name) VALUES (1, 'Teste 2');
INSERT INTO tb_expense_type(user_id, name) VALUES (1, 'Teste 3');
INSERT INTO tb_expense_type(user_id, name) VALUES (2, 'Teste 4');

INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (1, '2023-10-10',1, 10.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (1, '2023-10-10',1, 10.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (1, '2023-12-10',1, 11.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (1, '2023-12-10',1, 10.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (1, '2023-12-09',1, 54.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (1, '2023-12-09',1, 43.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (2, '2023-10-10',1, 10.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (2, '2023-10-10',1, 10.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (2, '2023-12-10',1, 11.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (3, '2023-12-10',1, 10.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (3, '2023-12-09',1, 30.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (3, '2023-12-09',1, 40.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (3, '2023-12-09',1, 23.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (3, '2023-12-09',1, 15.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (4, '2023-12-09',1, 19.1);
INSERT INTO tb_expenses(expense_type_id, date, user_id, spend) VALUES (4, '2023-12-09',1, 21.1);