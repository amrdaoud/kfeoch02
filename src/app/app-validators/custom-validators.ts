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
