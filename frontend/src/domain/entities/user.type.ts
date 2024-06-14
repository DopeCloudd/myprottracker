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
  token: string;
};

export type RegisterUser = Omit<User, "id" | "createdAt"> & {
  password: string;
  confirmPassword: string;
};

export type RegisterUserResponse = {
  success: boolean;
};

export type FetchUser = {
  token: string;
};

export type NewUser = User & {
  firstName: string;
  lastName: string;
};

export type UserBasicInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserProfileData = {
  firstName: string;
  lastName: string;
  email: string;
};
