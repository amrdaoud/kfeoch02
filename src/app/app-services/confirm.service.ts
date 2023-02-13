import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmModel } from '../app-models/shared';
import { ConfirmComponent } from '../shared/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private matDialog: MatDialog) { }
  open(data: ConfirmModel): Observable<boolean> {
    return this.matDialog.open(ConfirmComponent,{data, panelClass: 'dialog-no-padding'})
    .afterClosed()
  }
}
