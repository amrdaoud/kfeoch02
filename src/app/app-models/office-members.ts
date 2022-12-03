export interface OfficeMember {
  Id: number;
  OfficeId: number;
  NameArabic: string;
  NameEnglish: string;
  GenderId: number;
  NationalId: string;
  SemId: string;
  SpecialityId: number;
  ExperienceYears: number;
  SignatureUrl: string;
  CvUrl: string;
  CertificateUrl: string;
  IsApproved: boolean;
  IsDeleted: boolean;
  Documents: MemberDocument[];
}

export interface MemberDocument {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  Files: MemberFile[];
}
export interface MemberFile {
  Id: number;
  DocumentUrl: string;
  Name: string;
  AddedDate: Date;
}

export interface OfficeMemberViewModel {
  Id: number;
  OfficeId: number;
  NameArabic: string;
  NameEnglish: string;
  GenderId: number;
  GenderNameArabic: string;
  GenderNameEnglish: string;
  NationalId: string;
  SemId: string;
  SpecialityId: number;
  SpecialityNameArabic: string;
  SpecialityNameEnglish: string;
  ExperienceYears: number;
  IsApproved: boolean;
  IsDeleted: boolean;
}
