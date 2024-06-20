export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export type LoginRequest = Pick<User, "email"> & {
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type RegisterRequest = Omit<User, "id" | "createdAt"> & {
  password: string;
};

export type RegisterResponse = {
  success: boolean;
};

export type FetchUser = {
  token: string;
};
