import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import LanguageService from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private currentCode: number | null = null;
  constructor(private snackBar: MatSnackBar,
              private languageService: LanguageService) { }
  open(code: number, message: string) {
    if(this.currentCode !== code) {
      this.currentCode = code;
      this.snackBar.open(`${this.languageService.translate('Error Code')}-${code}: ${this.languageService.translate(message)}`, this.languageService.translate('OK'), {verticalPosition: 'top', panelClass: 'snack-error', duration:2000})
                    .afterDismissed().subscribe(() => this.currentCode = null)
    }
  }
  get isOpenedCode(): number | null {
    return this.currentCode;
  }
}
