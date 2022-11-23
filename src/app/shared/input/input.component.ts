import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
export class InputComponent implements OnInit {
@Input() type = 'text';
@Input() formGroup!: AbstractControl;
@Input() controlName = '';
@Input() label = '';
@Input() isAsync = false;
@Input() placeHolder = '';
formControl!: FormControl;
  constructor(private translate: TranslateService) {

   }

  ngOnInit(): void {
    this.formControl = this.formGroup.get(this.controlName) as FormControl;
  }
  getErrors(): string {
    if(!this.formControl) return '';
    const controlErrors = this.formControl.errors;
    if(!controlErrors) return '';
    let errorMessage = '';
    Object.keys(controlErrors).forEach(keyError => {
      if(keyError === 'isTaken') errorMessage += `${this.formControl.value} ${this.translate.instant("is taken!")}`;
      if(keyError === 'minlength') errorMessage +=  `${this.translate.instant("Minimum length is:")} ${controlErrors[keyError].requiredLength}`;
      if(keyError === 'maxlength') errorMessage +=  `${this.translate.instant("Maximum length is:")} ${controlErrors[keyError].requiredLength}`;
      if(keyError === 'required') errorMessage +=  `${this.label} ${this.translate.instant("is required!")}`;
      if(keyError === 'email') errorMessage +=  `${this.translate.instant("Not matching Email address pattern!")}`;
      if(keyError === 'pattern') errorMessage +=  `${this.translate.instant("Not matching pattern!")}`;
      if(keyError === 'notMatched') errorMessage +=  `${this.translate.instant("Not matched with Password!")}`;
      if(keyError === 'connection') errorMessage +=  `${this.translate.instant("Connection Problem!")}`;
    })
    return errorMessage;
  }

}
