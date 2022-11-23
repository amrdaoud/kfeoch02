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
  CountryId: number;
}
export interface Area {
  Id: number;
  NameArabic: string;
  NameEnglish: string;
  DescriptionArabic: string;
  DescriptionEnglish: string;
  GovernorateId: number;
}