import { AbstractControl } from "@angular/forms";

export const FormUtil = { isInvalid, getErrorMessage}

function isInvalid(control: AbstractControl): boolean {
    return control.touched && control.invalid;
}

function getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')){
        return 'Campo obrigatório'
    }

    if (control.hasError('minlength')){
        return `Deve ser maior ou igual a ${control.errors["minlength"].requiredLength}`
    }

    if (control.hasError('min')){
        return `Deve ser maior ou igual a ${control.errors["min"].min}`
    }    

    if (control.hasError('email')){
        return `E-mail inválido`
    }        

    return ''
}