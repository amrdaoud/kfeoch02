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

export interface OfficeSpecialityBindingModel {
  OfficeId: number;
  SpecialityId: number;
}
export interface OfficeSpecialityViewModel {
  Id: number;
  OfficeId: number ;
  SpecialityId: number;
  NameArabic: string;
  NameEnglish: string;
  AddedDate: Date;
  IsApproved: boolean;
  IsDeleted: boolean;
}

export interface OfficeActivityBindingModel {
  OfficeId: number;
  ActivityId: number;
}
export interface OfficeActivityViewModel {
  Id: number;
  OfficeId: number ;
  ActivityId: number;
  NameArabic: string;
  NameEnglish: string;
  AddedDate: Date;
  IsApproved: boolean;
  IsDeleted: boolean;
}

export interface OfficeContactViewModel {
  Id: number;
  OfficeId: number;
  ContactId: number;
  ContactNameArabic: string;
  ContactNameEnglish: string;
  PhoneNumber: string;
  AddedDate: Date;
  IsApproved: boolean;
  IsDeleted: boolean;
}

export interface OfficeContactBindingModel {
  OfficeId: number;
  ContactId: number;
  PhoneNumber: string;
}
