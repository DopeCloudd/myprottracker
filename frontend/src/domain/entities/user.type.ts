export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export type LoginUser = Pick<User, "email"> & {
  password: string;
};

export type LoginUserResponse = {
  user: User;
  token: string;
};

export type RegisterUser = Omit<User, "id" | "createdAt"> & {
  password: string;
};

export type RegisterUserResponse = {
  success: boolean;
};

export type FetchUser = {
  token: string;
};
