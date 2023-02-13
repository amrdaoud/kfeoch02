import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validateMatchFunction(matchWithControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const matchWithControl = control.parent?.get(matchWithControlName)
    if(!control || !matchWithControl || !control.value || !matchWithControl.value) {
      return null;
    }
    return control.value === matchWithControl.value ? null : {notMatched: true};
  }
}
export function validateClearSibling(clearControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    control.parent?.get(clearControlName)?.setValue('');
    return  null;
  }
}
export function validateGreaterFunction(matchWithControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const matchWithControl = control.parent?.get(matchWithControlName)
    if(!control || !matchWithControl || !control.value || !matchWithControl.value) {
      return null;
    }
    if(control.value > matchWithControl.value) {
      if(matchWithControl.hasError('notLess')) {
        matchWithControl.updateValueAndValidity();
      }
      //matchWithControl.markAsUntouched();
      return null;
    }
    return {notGreater: true};
  }
}
export function validateLessFunction(matchWithControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const matchWithControl = control.parent?.get(matchWithControlName)
    if(!control || !matchWithControl || !control.value || !matchWithControl.value) {
      return null;
    }
    if(control.value <= matchWithControl.value) {
      if(matchWithControl.hasError('notGreater')) {
        matchWithControl.updateValueAndValidity();
      }
      //matchWithControl.markAsUntouched();
      //matchWithControl.setValue(matchWithControl.value);
      return null;
    }
    return {notLess: true};
  }
}
export function validatePassword(): ValidatorFn {
  return(control: AbstractControl): ValidationErrors | null => {
    if(!control || !control.value) {
      return null;
    }
    const reg: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      return reg.test(control.value) ? null : {password: true}
  }
}
