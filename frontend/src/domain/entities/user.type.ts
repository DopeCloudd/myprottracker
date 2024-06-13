export type User = {
  email: string;
  password: string;
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
