export interface UserLoginRequestModel {
  email: string;
  password: string;
}

export interface UserRegisterRequestModel {
  email: string;
  password: string;
  userName: string;
}

export interface RefreshTokenRequestModel {
  refreshToken: string;
}
