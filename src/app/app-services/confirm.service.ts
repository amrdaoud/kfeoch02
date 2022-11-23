import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../shared/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private matDialog: MatDialog) { }
  open(Message: string): Observable<boolean> {
    return this.matDialog.open(ConfirmComponent,{data: {Message}, panelClass: 'dialog-no-padding'})
    .afterClosed()
  }
}
