import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { timeout } from 'rxjs';

export async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  })
}
export class FormUtils {


  static namePattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/;
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'email':
          return `El valor ingresado no es un correo electrónico`

        case 'emailTaken':
        return `El correo electrónico no está disponible`

        case 'strider':
          return `El nombre no puede ser strider`

        default:
          return 'Error de validación no controlado'
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    )

  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {

    return (
      formArray.controls[index].errors && formArray.controls[index].touched

    )

  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {

    if (!formArray.controls[index]) return null;
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  static onSave(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    form.reset('');


  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true }
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {

    await sleep();
    const formValue = control.value;

    if(formValue === 'hola@mundo.com'){
      return{
        emailTaken:true
      };
    }
    return null;
  }

  static notStrider(control:AbstractControl):ValidationErrors|null{

    return control.value === 'strider' ? {strider:true} : null;
  }

}
