import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

export interface OfficeType {
  Id: number;
  NameArabic: string | null;
  NameEnglish: string | null;
  DescriptionArabic: string | null;
  DescriptionEnglish: string | null;
}

export interface OfficeEntity {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  IsDeleted: boolean;
}

export interface OfficeLegalEntity {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  IsDeleted: boolean;
}

export interface Country {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
}
export interface Governorate {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  ParentId: number;
}
export interface Area {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  ParentId: number;
}
export interface Gender {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
}
export interface Specialty {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  ParentId: number;
  IsDeleted: boolean;
}
export interface Position {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  IsDeleted: boolean;
}
export interface Nationality {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
}

export interface Activity {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  ParentId: number;
  IsDeleted: boolean;
}
export interface ContactType {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  IsDeleted: boolean;
  Visible?: boolean;
}
export interface DocumentType {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  IsDeleted: boolean;
}
export interface PostCategory {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  IsDeleted: boolean;
}
export interface RequestType {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  Amount: number;
  IsDeleted: boolean;
}

export interface CertificateEntity {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  IsDeleted: boolean;
}
// export interface DictionaryTemplate {
//   Id: number;
//   NameArabic: string;
//   NameEnglish: string;
//   DescriptionArabic: string;
//   DescriptionEnglish: string;
//   IsDeleted: boolean;
// }

export interface DictionaryModel {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  ParentId: number;
  IsDeleted: boolean;
}

export class DictionaryTemplate {
  constructor(
    public urlName: string,
    public name: string,
    public data: Observable<any>,
    public dataLoading: Observable<boolean>,
    public haveParent: boolean,
    public frm: FormGroup,
    public parentData?:Observable<any>,
    public parentLabel?: string,
    public parentLoading?: Observable<boolean>,
    public haveNumberProperty?: boolean,
    public numberPropertyName?: string,
    public numberPropertyLabel?: string
  ){}

}
