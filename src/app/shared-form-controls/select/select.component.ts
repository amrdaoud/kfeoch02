import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    }
  ]
})
export class SelectComponent implements OnInit {
  @Input() type = 'text';
  @Input() formGroup!: AbstractControl;
  @Input() controlName = '';
  @Input() label = '';
  @Input() isAsync = false;
  @Input() placeHolder = '';
  @Input() isLoading = false;
  @Input() options:Array<any> = [];
  @Input() optionValue = 'Id';
  @Input() optionDisplay = 'Name';
  @Input() optionDisplay2 = '';
  @Input() isMulty = false;
  @Input() haveNull = false;
  @Input() defaultValue: number | string | undefined;
  @Output() valueChanges = new EventEmitter<any>();
  formControl!: FormControl;
  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.formControl = this.formGroup.get(this.controlName) as FormControl;
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
    })
    return errorMessage;
  }
  onValueChange(val: any) {
    this.valueChanges.emit(val);
  }


}
