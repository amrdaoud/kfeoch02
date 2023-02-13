import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role, User, UserAdd } from '../app-models/user-manager';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  private url = environment.apiUrl + 'account/'
  private isLoadingUsers = new BehaviorSubject<boolean>(false);
  private isLoadingRoles = new BehaviorSubject<boolean>(false);
  private isLoadingUser = new BehaviorSubject<boolean>(false);
  private isChangingPassword = new BehaviorSubject<boolean>(false);
  private isChangingRoles = new BehaviorSubject<boolean>(false);
  private isAddingUser = new BehaviorSubject<boolean>(false);
  private isDeactivating = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  httpGetAllUsers(): Observable<User[]> {
    this.isLoadingUsers.next(true);
    return this.http.get<User[]>(this.url + 'users').pipe(
      finalize(() => this.isLoadingUsers.next(false))
    )
  }
  httpGetUserById(id: string): Observable<User> {
    this.isLoadingUser.next(true);
    return this.http.get<User>(this.url + 'users/' + id).pipe(
      finalize(() => this.isLoadingUser.next(false))
    )
  }
  httpGetRoles(): Observable<Role[]> {
    this.isLoadingRoles.next(true);
    return this.http.get<Role[]>(this.url + 'roles').pipe(
      finalize(() => this.isLoadingRoles.next(false))
    )
  }
  httpChangePassword(id: string, newPassword: string): Observable<boolean> {
    this.isChangingPassword.next(true);
    return this.http.post<boolean>(this.url + 'user-resetpassword', {id, newPassword}).pipe(
      finalize(() => this.isChangingPassword.next(false))
    );
  }
  httpChangeRoles(id: string, roles: string[]): Observable<User> {
    this.isChangingRoles.next(true);
    return this.http.put<User>(this.url + 'users/' + id, {id, roles}).pipe(
      finalize(() => this.isChangingRoles.next(false))
    );
  }
  httpAddUser(user: UserAdd): Observable<boolean> {
    this.isAddingUser.next(true);
    return this.http.post<boolean>(this.url + 'add-user', user).pipe(
      finalize(() => this.isAddingUser.next(false))
    )
  }
  httpDeactivateAccount(id: string): Observable<any> {
    this.isDeactivating.next(true);
    return this.http.get<any>(this.url + 'deactivate-account/' + id).pipe(
      finalize(() => this.isDeactivating.next(false))
    )
  }
  httpActivateAccount(id: string): Observable<any> {
    this.isDeactivating.next(true);
    return this.http.get<any>(this.url + 'activate-account/' + id).pipe(
      finalize(() => this.isDeactivating.next(false))
    )
  }
  get isLoadingUsers$(): Observable<boolean> {
    return this.isLoadingUsers.asObservable();
  }
  get isLoadingUser$(): Observable<boolean> {
    return this.isLoadingUser.asObservable();
  }
  get isLoadingRoles$(): Observable<boolean> {
    return this.isLoadingRoles.asObservable();
  }
  get isChangingPassword$(): Observable<boolean> {
    return this.isChangingPassword.asObservable();
  }
  get isChangingRoles$(): Observable<boolean> {
    return this.isChangingRoles.asObservable();
  }
  get isAddingUser$(): Observable<boolean> {
    return this.isAddingUser.asObservable();
  }
  get isDeactivating$(): Observable<boolean> {
    return this.isDeactivating.asObservable();
  }
}
