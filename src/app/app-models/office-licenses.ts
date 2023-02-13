import { CurrencyPipe, DatePipe } from "@angular/common";
import { LocaleDatePipe } from "../app-helpers/locale-date.pipe";
import { LocalizedCurrencyPipe } from "../app-helpers/localized-currency.pipe";
import { LocalizedDatePipe } from "../app-helpers/localized-date.pipe";
import { Specialty } from "./dictionary";
import { ColumnDef } from "./shared";

// export interface License {
//   Id: number;
//   OfficeId: number;
//   StatusNameArabic: string;
//   StatusNameEnglish: string;
//   PaymentTypeNameArabic: string;
//   PaymentTypeNameEnglish: string;
//   CreateDate: Date;
//   RegistrationStartDate: Date;
//   RegistrationEndDate: Date;
//   DocumentUrl: string;
//   PaymentAmount: number;
//   PaymentNumber: string;
//   IsPaid: boolean;
//   IsApproved: boolean;
//   IsRejected: boolean;
//   IsCanceled: boolean;
//   HasDocument: boolean;
//   OfficeNameArabic: string;
//   OfficeNameEnglish: string;
// }

export const licenseColumns: {handset: ColumnDef[], nonHandset: ColumnDef[]} = {
  handset: [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Start Date', Property: 'StartDate',NameArabic: 'تاريخ البداية', IsSort: true, Pipe: LocalizedDatePipe},
    {Name: 'End Date', Property: 'EndDate',NameArabic: 'تاريخ النهاية', IsSort: true, Pipe: LocalizedDatePipe}
  ],
  nonHandset:
  [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Start Date',NameArabic: 'تاريخ البداية', Property: 'StartDate', IsSort: true, Pipe: LocalizedDatePipe},
    {Name: 'End Date',NameArabic: 'تاريخ النهاية', Property: 'EndDate', IsSort: true, Pipe: LocalizedDatePipe},
    {Name: 'Status',NameArabic: 'الحالة', Property: 'IsPending',HideData: true, IsSort: true,
    IconChangerProperties: ['IsPending', 'IsApproved', 'IsRejected', 'OutDated'],
    IconChangers: ['history', 'done_all', 'highlight_off', 'hourglass_disabled'],
    ColorChangers: ['', 'green', 'red', 'grey']},


  ]
}

export interface License {
  Id: number;
  OfficeId: number;
  CreateDate: Date;
  OfficeEntityId: number;
  Specialities: Specialty[];
  StartDate: Date;
  EndDate: Date;
  Note: string;
  IsRejected: boolean;
  IsApproved: boolean;
  UploadDate?: Date;
  DocumentUrl?: string;
  IsFirst: boolean;
  file: File;
  IsPending: boolean;
  OutDated: boolean;
}
export interface AdminLicense {
  Id: number;
  OfficeId: number;
  EntityId: number;
  CreatedDate: Date;
  DocumentUrl: string;
  EndDate: Date;
  EntityNameArabic: string;
  EntityNameEnglish: string;
  LicenseId: number;
  OfficeNameArabic: string;
  OfficeNameEnglish: string;
  StartDate: string;
  UploadDate: Date;
}

export const adminLicenseColumns: {handset: ColumnDef[], nonHandset: ColumnDef[]} = {
  handset: [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Start Date',NameArabic: 'تاريخ البداية', Property: 'StartDate', IsSort: true, Pipe: LocalizedDatePipe},
    {Name: 'End Date',NameArabic: 'تاريخ النهاية', Property: 'EndDate', IsSort: true, Pipe: LocalizedDatePipe}
  ],
  nonHandset:
  [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Office License',NameArabic: 'الرخصة', Property: 'LicenseId'},
    {Name: 'Office',Property: 'OfficeNameEnglish', NameArabic: 'المكتب', PropertyArabic: 'OfficeNameArabic'},
    {Name: 'Start Date',NameArabic: 'تاريخ البداية', Property: 'StartDate', IsSort: true, Pipe: LocalizedDatePipe},
    {Name: 'End Date',NameArabic: 'تاريخ النهاية', Property: 'EndDate', IsSort: true, Pipe: LocalizedDatePipe}
  ]
}

export interface PaymentModel {
  StatusNameArabic: string;
  StatusNameEnglish: string;
  NextMembershipEndDate: Date;
  CurrentMembershipEndDate: Date;
  TotalAmount: number;
  Payments: PaymentDetailsModel[]
}
export interface PaymentDetailsModel {
  Id: number;
  Amount: number;
  OfficeId: number;
  IsPaid: boolean;
  PaymentDate: Date;
  PaymentNumber: number;
  PaymentUrl: string;
  RequestNameArabic: string;
  RequestNameEnglish: string;
  TypeId: number;
  MembershipEndDate: Date;
  PaymentTypeNameArabic: string;
  PaymentTypeNameEnglish: string;
  YearsCount: number;
}

export const paymentColumns: {handset: ColumnDef[], nonHandset: ColumnDef[]} = {
  handset: [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Date', NameArabic: 'التاريخ', Property: 'PaymentDate', IsSort: true,Pipe: LocalizedDatePipe},
    {Name: 'Amount', NameArabic: 'القيمة', Property: 'Amount', Pipe: LocalizedCurrencyPipe, IsSort: true}
  ],
  nonHandset:
  [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'Date', NameArabic: 'التاريخ', Property: 'PaymentDate', IsSort: true,Pipe: LocalizedDatePipe},
    {Name: 'Type', NameArabic: 'النوع', Property: 'PaymentTypeNameEnglish', PropertyArabic: 'PaymentTypeNameArabic'},
    {Name: 'Details', NameArabic: 'معلومات', Property: 'RequestNameEnglish', PropertyArabic: 'RequestNameArabic'},
    {Name: 'Membership Expiry', NameArabic: 'انتهاء الحساب', Property: 'MembershipEndDate', Pipe: LocalizedDatePipe},
    {Name: 'Amount', NameArabic: 'القيمة', Property: 'Amount', Pipe: LocalizedCurrencyPipe, IsSort: true}
  ]
}
