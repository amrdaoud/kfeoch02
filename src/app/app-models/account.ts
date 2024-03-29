export interface OfficeLoginModel {
  LicenseId: number;
  OfficeTypeId: number;
  Password: string;
}
export interface AdminLoginModel {
  UserName: string;
  Password: string;
}
export interface OfficeRegistrationModel {
  LicenseId: number;
  OfficeTypeId: number;
  NameArabic: string ;
  NameEnglish: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  AggreeToTerms: boolean;
}
export interface OfficeResetPasswordModel {
  LicenseId: number;
  OfficeTypeId: number;
  NewPassword: string;
}

export interface AuthenticationModel {
  Message: string | null;
  IsAuthenticated: boolean;
  NameArabic: string | null;
  NameEnglish: string | null;
  UserName: string | null;
  Email: string | null;
  Roles: string[] | null;
  Token: string | null;
  TokenDurationM: number;
  TokenExpiry: Date | string | null;
  RefreshToken: string | null;
  RefreshTokenDurationM: number;
  RefreshTokenExpiry: Date | string;
  OfficeId: number;
  TokenDate: number;
  IsEmailConfirmed: boolean;
  MessageArabic: string | null;
}
export interface OfficeChangePasswordModel {
  UserName: string;
  CurrentPassword: string;
  NewPassword: string;
}

export interface ForgetSendModel {
  Email: string;
  ClientUri: string;
}
export interface ForgetReceiveModel {
  Email: string;
  Password: string;
  Token: string;
}
