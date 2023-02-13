import { AfterViewInit, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    }
  ]
})
export class InputComponent implements OnInit, AfterViewInit {
@Input() type = 'text';
@Input() formGroup!: AbstractControl;
@Input() controlName = '';
@Input() label = '';
@Input() isAsync = false;
@Input() placeHolder = '';
@Input() matchLabel = '';
@Input() lines = 2;
isHandset = this.deviceService.isHandset$;
formControl!: FormControl;
@ViewChild(MatFormField) formField!: MatFormField;
  constructor(
              private deviceService: DeviceService,
              private languageService: LanguageService) {

   }

  ngOnInit(): void {
    this.formControl = this.formGroup.get(this.controlName) as FormControl;
  }
  ngAfterViewInit(): void {
      this.languageService.currentLanguage$.subscribe(() => {
        setTimeout(() => {
          this.formField.updateOutlineGap();
        },50);
      })
  }
  getErrors(): string {
    if(!this.formControl) return '';
    const controlErrors = this.formControl.errors;
    if(!controlErrors) return '';
    let errorMessage = '';
    Object.keys(controlErrors).forEach(keyError => {
      if(keyError === 'isTaken') errorMessage += `${this.formControl.value} ${this.languageService.translate("is taken!")}`;
      if(keyError === 'minlength') errorMessage +=  `${this.languageService.translate("Minimum length is:")} ${controlErrors[keyError].requiredLength}`;
      if(keyError === 'maxlength') errorMessage +=  `${this.languageService.translate("Maximum length is:")} ${controlErrors[keyError].requiredLength}`;
      if(keyError === 'required') errorMessage +=  `${this.label} ${this.languageService.translate("is required!")}`;
      if(keyError === 'email') errorMessage +=  `${this.languageService.translate("Not matching Email address pattern!")}`;
      if(keyError === 'pattern') errorMessage +=  `${this.languageService.translate("Not matching pattern!")}`;
      if(keyError === 'notMatched') errorMessage +=  `${this.languageService.translate("Not matched with Password!")}`;
      if(keyError === 'connection') errorMessage +=  `${this.languageService.translate("Connection Problem!")}`;
      if(keyError === 'notGreater') errorMessage +=  `${this.languageService.translate("Must be greater than ")} ${this.matchLabel}`;
      if(keyError === 'notLess') errorMessage +=  `${this.languageService.translate("Must be less than ")} ${this.matchLabel}`;
      if(keyError === 'password') errorMessage +=  `${this.languageService.translate("At least 6 characters, at least one digit, one upper & one lower case!")}`;
    })
    return errorMessage;
  }

}
