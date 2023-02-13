import { ColumnDef } from "./shared";

export interface User {
  Id: string;
  Email: string;
  UserName: string;
  Roles: string[];
  IsActive: boolean;
}
export interface Role {
  Id: string;
  Name: string;
}
export interface UserAdd {
  UserName: string;
  Email: string;
  Password: string;
  Roles: string[];
}

export const userColumns: {handset: ColumnDef[], nonHandset: ColumnDef[]} = {
  handset: [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'User Name', Property: 'UserName', NameArabic: 'اسم المستخدم', IsSort: true},
    {Name: 'Email', Property: 'Email', NameArabic: 'البريد الالكتروني'}
  ],
  nonHandset:
  [
    {Name: '#', Property: 'Id', IsSort: true},
    {Name: 'User Name', Property: 'UserName', NameArabic: 'اسم المستخدم', IsSort: true},
    {Name: 'Email', Property: 'Email', NameArabic: 'البريد الالكتروني'},
    {Name: 'Roles', Property: 'Roles', NameArabic: 'الصلاحيات'}
  ]
}
