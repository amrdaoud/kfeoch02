export interface routeConfig {
  icon: string;
  title: string;
  subTitle: string;
  routerLink: string;
  roles: string[];
}
export interface mainRouteConfig {
  icon:string;
  routerLink: string;
  toolTip: string;
  roles: string[];
}
export const admin: mainRouteConfig[] = [
  {icon: 'apartment', routerLink: '/kfeoch-admin/offices/', toolTip: 'Office Management', roles: ['Administrator', 'BillingManager', 'OfficeManager']},
  {icon: 'web', routerLink: '/kfeoch-admin/site-content/', toolTip: 'Site Contents', roles: ['Administrator', 'SiteManager']},
  {icon: 'mail', routerLink: '/kfeoch-admin/messages', toolTip: 'Received Messages', roles: ['Administrator', 'SiteManager']},
  {icon: 'format_list_bulleted_add', routerLink: '/kfeoch-admin/dictionaries', toolTip: 'Dictionaries Management', roles: ['Administrator', 'DictionaryManager']},
  {icon: 'published_with_changes', routerLink: '/kfeoch-admin/licenses', toolTip: 'Offices Certificates', roles: ['Administrator', 'OfficeManager']},
  {icon: 'settings', routerLink: '/kfeoch-admin/config/', toolTip: 'Configurations', roles: ['DictionaryManager', 'ReportManager', 'BillingManager', 'Administrator', 'Manager', 'SiteManager', 'OfficeManager']},
  {icon: 'table', routerLink: '/kfeoch-admin/reports', toolTip: 'Main Reports', roles: ['Administrator', 'ReportManager']},
]
export const adminOffices: routeConfig[] = [
  {icon: 'list', title: 'Offices List', subTitle: 'List & Filter all registered offices', routerLink: 'list', roles: ['Administrator','OfficeManager']},
  {icon: 'payments', title: 'Billing Information', subTitle: 'List & Filter all offices billing information', routerLink: 'billing', roles: ['Administrator','BillingManager']},
]
export const adminConfig: routeConfig[] = [
  {icon: 'group', title: 'User Manager', subTitle: 'Manage Users & Roles', routerLink: 'users', roles: ['Administrator']},
  {icon: 'add', title: 'Add New User', subTitle: 'Register a new user', routerLink: 'add-user', roles: ['Administrator']},
  {icon: 'key', title: 'Security', subTitle: 'Change account password', routerLink: 'security', roles: ['DictionaryManager', 'ReportManager', 'BillingManager', 'Administrator', 'Manager', 'SiteManager', 'OfficeManager']},
]
