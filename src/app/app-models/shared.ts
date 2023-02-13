import { Toolbar } from 'ngx-editor';
import { Observable } from 'rxjs';

export interface ResultWithMessage {
  Success: boolean;
  Message: string | null;
  MessageArabic: string | null;
  MessageEnglish: string | null;
}
export const confirmMapping =
new Map()
.set('update', {message: 'Are you sure you want to update', color: 'primary'})
.set('delete', {message: 'Are you sure you want to delete',color: 'warn'})
.set('add', {message: 'Are you sure you want to add',color: 'primary'})
.set('logout', {message: 'Are you sure you want to Logout',color: 'warn'})
.set('reset', {message: 'Are you sure you want to reset form',color: 'warn'})
.set('change', {message: 'Are you sure you want to change password',color: 'primary'})
.set('add-license', {message: 'You cannot update this license after adding, Proceed?',color: 'primary'})
.set('approve-license', {message: 'Are you sure you want to approve this license?',color: 'primary'})
.set('reject-license', {message: 'Are you sure you want to reject this license?',color: 'warn'})
.set('approve-license-payment', {message: 'Are you sure you want to approve this license and place office payments?',color: 'primary'})
.set('reject-license-payment', {message: 'Are you sure you want to reject this license? payments will be ignored',color: 'warn'})
.set('renew', {message: 'Are you sure you want to renew membership?',color: 'primary'})
.set('request', {message: 'Are you sure you want to request this certificate?',color: 'primary'})
.set('activate', {message: 'Are you sure you want to activate account?',color: 'primary'})
.set('deactivate', {message: 'Are you sure you want to deactivate account?',color: 'primary'})
export interface ConfirmModel {
  Message?: string;
  Type?: string;
  ElementNameEnglish?: string;
  ElementNameArabic?: string;
}
export class ColumnDef {
  constructor(property: string){
    this.Name = property;
    this.Property = property;
    this.IsSort = false;
  }
  public Name: string;
  public Pipe?: any;
  public PipeArgs?: string;
  public Pipe2?: any;
  public PipeArgs2?: string;
  public Property: string;
  public IsSort?: boolean;
  public ColorProperty?: string;
  public HideData?: boolean;
  public Icon?: string;
  public IsTooltip?:boolean;
  public SubProperty?: string;
  public IconChangerProperties?:string[];
  public IconChangers?: string[];
  public ColorChangers?: string[];
  public NameArabic?: string;
  public PropertyArabic?: string;
  public IconTrue?: string;
  public IconFalse?: string;
}

export class DynamicTableByndingModel {
  constructor(){
    this.SearchQuery = '';
    //this.Filters = [];
    this.PageIndex = 0;
    this.PageSize = 20;
    this.Sort = "Id";
    this.Order = "asc";
  }
  public SearchQuery: string | null;
  //public Filters: Map<string,string>[];
  public PageIndex: number;
  public PageSize: number;
  public Sort: string;
  public Order: string;
}

export interface DynamicTableResult {
  Data: any[];
  DataSize: number;
}

export const toolbar: Toolbar = [
  // default value
  ['bold', 'italic'],
  ['underline', 'strike'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
  ['horizontal_rule', 'format_clear'],
];

export interface SelectFilter {
  label: string;
  labelArabic?: string;
  propertyValue?: string;
  displayValue?: string;
  displayValueArabic?: string;
  controlName: string;
  values?: Observable<any[]>;
  isMulti?: boolean;
  isLoading?: Observable<boolean>;
  type: 'select' | 'checkbox' | 'date' | 'auto-complete';
  updateOn?: 'blur' | 'change' | 'submit';
}


