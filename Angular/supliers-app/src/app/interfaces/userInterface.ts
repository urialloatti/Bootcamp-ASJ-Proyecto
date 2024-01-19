export interface UserInterface {
  id?: number;
  username: string;
  passwordHash: string;
  email: string;
  name: string;
  surname: string;
  createdAt?: string;
  updatedAt?: string;
  isAvailable?: boolean;
}

export interface UserCredentialsInterface {
  username: string;
  password: string;
}

export interface userDataInterface {
  username: string;
  email: string;
  name: string;
  surname: string;
}
