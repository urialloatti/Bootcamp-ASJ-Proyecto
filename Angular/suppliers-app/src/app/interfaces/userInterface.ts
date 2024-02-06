export interface UserResponseDTO {
  id?: number;
  username: string;
  email: string;
  name: string;
  surname: string;
  rol: rol;
}

export interface UserValidationResponseDTO {
  valid: boolean;
}

export interface UserRequestDTO {
  username: string;
  passwordHash: string;
  email: string;
  name: string;
  surname: string;
  rolId?: number;
}

export interface UserCredentialsDTO {
  username: string;
  passwordHash: string;
}

type rol = 'admin' | 'user';
