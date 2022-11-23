export interface HomeOffice {
  Id: number;
  NameEnglish: string;
  NameArabic: string;
  LogoUrl: string;
  Name?: string;
}
export interface Office {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  TypeId: number;
  LicenseId: number;
  RegistrationDate: Date | string | null;
  EstablishmentDate: Date;
  LicenseEndDate: Date | string | null;
  Email: string;
  PhoneNumber: string | null;
  FaxNumber: string | null;
  MailBox: string | null;
  PostalCode: string | null;
  Address: string | null;
  CountryId: number;
  GovernorateId: number;
  AreaId: number | null;
  EntityId: number | null;
  LegalEntityId: number | null;
  IsVerified: boolean;
  IsActive: boolean;
  AgreeToTerms: boolean;
  LogoUrl: string | null;
  ShowInHome: boolean | null;
}
