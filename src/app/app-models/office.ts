import { LocalizedCurrencyPipe } from "../app-helpers/localized-currency.pipe";
import { LocalizedDatePipe } from "../app-helpers/localized-date.pipe";
import { ColumnDef } from "./shared";

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
  TypeEnglish: string;
  TypeArabic: string;
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
  AutoNumberOne: string;
  AutoNumberTwo: string;
  EmailTwo: string;
  IsLocal: boolean;
  RenewYears: Date;
  MembershipEndDate: Date;
  TypeNameEnglish: string;
  TypeNameArabic: string;
  EntityNameArabic: string;
  EntityNameEnglish: string;
  LegalEntityNameArabic: string;
  LegalEntityNameEnglish: string;
  CountryNameArabic: string;
  CountryNameEnglish: string;
  GovernorateNameArabic: string;
  GovernorateNameEnglish: string
  AreaNameArabic: string;
  AreaNameEnglish: string;
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
export interface AdminOffice {
  NameArabic: string,
  Id: number,
  NameEnglish: string,
  TypeId: Number,
  TypeNameArabic: string,
  TypeNameEnglish: string,
  LicenseId: number,
  RegistrationDate: Date,
  EstablishmentDate: Date
  LicenseEndDate: Date
  MembershipEndDate: Date,
  Email: string,
  PhoneNumber: string,
  AreaId: number,
  AreaNameArabic: string,
  AreaNameEnglish: string,
  GovernorateId: string,
  GovernorateNameArabic: string,
  GovernorateNameEnglish: string,
  CountryId: number,
  CountryNameArabic: string,
  CountryNameEnglish: string,
  EntityId: number,
  EntityNameArabic: string,
  EntityNameEnglish: string,
  LegalEntityId: number,
  LegalEntityNameArabic: string,
  LegalEntityNameEnglish: string,
  IsVerified: boolean,
  IsActive: boolean,
  LogoUrl: string,
  ShowInHome: boolean,
  RenewYears: number
}


export const adminOfficeColumns: {handset: ColumnDef[], nonHandset: ColumnDef[]} = {
  handset: [
    // {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Name', NameArabic: 'الاسم', Property: 'NameEnglish', PropertyArabic: 'NameArabic'}
    // {Name: 'Date', NameArabic: 'التاريخ', Property: 'PaymentDate', IsSort: true,Pipe: LocalizedDatePipe},
    // {Name: 'Amount', NameArabic: 'القيمة', Property: 'Amount', Pipe: LocalizedCurrencyPipe, IsSort: true}
  ],
  nonHandset:
  [
    // {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'License', NameArabic: 'الرخصة', Property: 'LicenseId'},
    {Name: 'Name', NameArabic: 'الاسم', Property: 'NameEnglish', PropertyArabic: 'NameArabic'},
    {Name: 'Type', NameArabic: 'النوع', Property: 'TypeNameEnglish', PropertyArabic: 'TypeNameArabic'},
    {Name: 'Entity', NameArabic: 'الكيان', Property: 'EntityNameEnglish', PropertyArabic: 'EntityNameArabic'},
    {Name: 'Membership Expiry', NameArabic: 'انتهاء الحساب', Property: 'MembershipEndDate', Pipe: LocalizedDatePipe},
    {Name: 'Verified?', NameArabic: 'معتمد؟', Property: 'IsVerified', IconTrue: 'done', IconFalse: 'close', HideData: true},
    {Name: 'Active?', NameArabic: 'نشط؟', Property: 'IsActive', IconTrue: 'done', IconFalse: 'close', HideData: true},

    // {Name: 'Type', NameArabic: 'النوع', Property: 'PaymentTypeNameEnglish', PropertyArabic: 'PaymentTypeNameArabic'},
    // {Name: 'Details', NameArabic: 'معلومات', Property: 'RequestNameEnglish', PropertyArabic: 'RequestNameArabic'},
    // {Name: 'Amount', NameArabic: 'القيمة', Property: 'Amount', Pipe: LocalizedCurrencyPipe, IsSort: true}
  ]
}

export interface AdminBilling {
  Id: number;
  OfficeId: number;
  OfficeNameEnglish: number;
  OfficeNameArabic: number;
  RequestNameEnglish: number;
  RequestNameArabic: number;
  PaymentDate: Date;
  Amount: number;
  YearsCount: number;
  IsPaid: boolean;
  PaymentNumber: string;
  PaymentCategoryArabic: string;
  PaymentCategoryEnglish: string;
}

export const adminBillingColumns: {handset: ColumnDef[], nonHandset: ColumnDef[]} = {
  handset: [
    // {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Name', NameArabic: 'الاسم', Property: 'OfficeNameEnglish', PropertyArabic: 'OfficeNameArabic'},
    {Name: 'Date', NameArabic: 'التاريخ', Property: 'PaymentDate', IsSort: true,Pipe: LocalizedDatePipe},
    {Name: 'Amount', NameArabic: 'القيمة', Property: 'Amount', Pipe: LocalizedCurrencyPipe, IsSort: true}
  ],
  nonHandset:
  [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Office#', NameArabic: 'المكتب#', Property: 'OfficeId', IsSort: true},
    // {Name: 'License', NameArabic: 'الرخصة', Property: 'LicenseId'},
    {Name: 'Name', NameArabic: 'الاسم', Property: 'OfficeNameEnglish', PropertyArabic: 'OfficeNameArabic'},
    {Name: 'Date', NameArabic: 'التاريخ', Property: 'PaymentDate', IsSort: true,Pipe: LocalizedDatePipe},
    {Name: 'Amount', NameArabic: 'القيمة', Property: 'Amount', Pipe: LocalizedCurrencyPipe, IsSort: true},
    {Name: 'Tansaction#', NameArabic: 'معرف التحويل', Property: 'PaymentNumber', IsSort: true},
    {Name: 'Category', NameArabic: 'النوع', Property: 'PaymentCategoryEnglish', PropertyArabic:'PaymentCategoryArabic',IsSort: true},
    {Name: 'Description', NameArabic: 'البيان', Property: 'RequestNameEnglish', PropertyArabic:'RequestNameArabic'},
  ]
}
