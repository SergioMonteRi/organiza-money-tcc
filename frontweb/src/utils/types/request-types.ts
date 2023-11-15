export type LoginRequest = {
  username: string;
  password: string;
};

export type UserRegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SpendAddRequest = {
  value: string;
  expenseType: {
    id: number;
    name: string;
  };
  date: string;
};
