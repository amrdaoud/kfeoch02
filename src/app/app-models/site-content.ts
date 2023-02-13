import { LocalizedDatePipe } from "../app-helpers/localized-date.pipe";
import { ColumnDef } from "./shared";

export interface Page {
  Id: number;
  HostUrl: string;
  TitleEnglish: string;
  TitleArabic: string;
  SubtitleEnglish: string;
  SubtitleArabic: string;
  BodyEnglish: string;
  BodyArabic: string;
  ImageUrl: string;
  IsPublished: boolean;
  PublishDate: Date;
  Template: string;
  Posts: Post[];
  ImageFile: File;
}

export interface Post {
  Id: number;
  HostUrl: string;
  TitleEnglish: string;
  TitleArabic: string;
  SubtitleEnglish: string;
  SubtitleArabic: string;
  BodyEnglish: string;
  BodyArabic: string;
  ImageUrl: string;
  Sections: Section[];
  IsPublished: boolean;
  PublishDate: Date;
  PageId: number;
  Order?: number;
  ImageFile: File;
  CategoryId?: number;
  CategoryNameEnglish: string;
  CategoryNameArabic: string;
}
export interface Section {
  Id: number;
  PostId: number;
  HostUrl: string;
  TitleEnglish: string;
  TitleArabic: string;
  SubtitleEnglish: string;
  SubtitleArabic: string;
  BodyEnglish: string;
  BodyArabic: string;
  ImageUrl: string;
  ImageFile: File;
}

export interface GuestMessage {
  Id: number;
  Name: string;
  Email: string;
  PhoneNumber: string;
  Subject: string;
  CreatedDate: Date;
  ReadDate: Date;
  IsRead: boolean;
}


export const imagesUrlMap: {url: string, imageUrlEnglish?: string, imageUrlArabic?: string}[] = [
  {url: 'chairman-word', imageUrlEnglish: 'assets/images/pages/about.png', imageUrlArabic: 'assets/images/pages/about.png'},
  {url: 'reference-and-objectives', imageUrlEnglish: 'assets/images/pages/about.png', imageUrlArabic: 'assets/images/pages/about.png'},
  {url: 'statute-and-regulations', imageUrlEnglish: 'assets/images/pages/about.png', imageUrlArabic: 'assets/images/pages/about.png'},
  {url: 'board', imageUrlEnglish: 'assets/images/pages/about.png', imageUrlArabic: 'assets/images/pages/about.png'},

];

export const gusetMessagesColumns: {handset: ColumnDef[], nonHandset: ColumnDef[]} = {
  handset: [
    {Name: 'Name', NameArabic: 'الاسم', Property: 'Name', IsSort: true},
    {Name: 'Date', NameArabic: 'التاريخ', Property:'CreatedDate', IsSort:true, Pipe:LocalizedDatePipe},
    {Name: 'Read?', NameArabic: 'مقروء؟', Property: 'IsRead', IconTrue: 'drafts', IconFalse: 'mark_email_unread', HideData: true, IsSort:true},
  ],
  nonHandset:
  [
    {Name: 'Name', NameArabic: 'الاسم', Property: 'Name', IsSort: true},
    {Name: 'Date', NameArabic: 'التاريخ', Property:'CreatedDate', IsSort:true, Pipe:LocalizedDatePipe},
    {Name: 'Email Address', NameArabic: 'البريد الالكتروني', Property:'Email'},
    {Name: 'Phone Number', NameArabic: 'رقم الهاتف', Property:'PhoneNumber'},
    {Name: 'Read?', NameArabic: 'مقروء؟', Property: 'IsRead', IconTrue: 'drafts', IconFalse: 'mark_email_unread', HideData: true, IsSort:true},
  ]
}
