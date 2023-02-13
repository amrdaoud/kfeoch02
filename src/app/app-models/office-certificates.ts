import { LocalizedCurrencyPipe } from "../app-helpers/localized-currency.pipe";
import { LocalizedDatePipe } from "../app-helpers/localized-date.pipe";
import { ColumnDef } from "./shared";

export interface OfficeCertificate {
  Id: number;
  OfficeId: number;
  OfficeLicenseId: number;
  OfficeNameArabic: string;
  OfficeNameEnglish: string;
  RequestTypeId: number;
  RequestTypeNameArabic: string;
  RequestTypeNameEnglish: string;
  CertificateEntityId: number;
  CertificateEntityNameArabic: string;
  CertificateEntityNameEnglish: string;
  Amount: number;
  IsPaid: boolean;
  PaymentUrl: string;
  PaymentNumber: string;
  CreatedDate: Date;
  CanceledDate: Date;
  ApprovedDate: Date;
  RejectedDate: Date;
  DoneDate: Date;
  IsCanceled: boolean;
  IsApproved: boolean;
  IsRejected: boolean;
  IsDone: boolean;
  PaymentId: number;
}

export interface OfficeCertificateBinding {
  OfficeId: number;
  RequestTypeId: number;
  CertificateEntityId?: number;
  Lang: string;
  ReturnUrl: string;
}

export const certificateColumns: {handset: ColumnDef[], nonHandset: ColumnDef[]} = {
  handset: [
    {Name: 'Date',NameArabic: 'التاريخ', Property: 'CreatedDate', IsSort: true, Pipe: LocalizedDatePipe},
    {Name: 'Certificate', Property: 'RequestTypeNameEnglish',NameArabic: 'الشهادة', PropertyArabic: 'RequestTypeNameArabic',IsSort:true},
    {Name: 'Amount', Property: 'Amount',NameArabic: 'المبلغ', IsSort: true, Pipe: LocalizedCurrencyPipe}
  ],
  nonHandset:
  [
    {Name: 'Date',NameArabic: 'التاريخ', Property: 'CreatedDate', IsSort: true, Pipe: LocalizedDatePipe},
    {Name: 'Certificate', Property: 'RequestTypeNameEnglish',NameArabic: 'الشهادة', PropertyArabic: 'RequestTypeNameArabic',IsSort:true},
    {Name: 'Entity', Property: 'CertificateEntityNameEnglish',NameArabic: 'الجهة', PropertyArabic: 'CertificateEntityNameArabic',IsSort:true},
    {Name: 'Amount', Property: 'Amount',NameArabic: 'المبلغ', IsSort: true, Pipe: LocalizedCurrencyPipe}
  ]
}
