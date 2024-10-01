import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ControlContainer, Validators } from '@angular/forms';
import { FormUtil } from '../form-util';

@Component({
  selector: 'dbs-input-email',
  templateUrl: './dbs-input-email.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DbsInputEmailComponent),
      multi: true
    }
  ]
})
export class DbsInputEmailComponent implements ControlValueAccessor, OnInit {
  @Input() control!: AbstractControl;
  @Input() obrigatorio: boolean = false;
  
  value: string = '';

  ngOnInit(): void {
    if (this.control) {
      this.setDefaultValidators();
    }
  }

  // Definindo validações padrão
  private setDefaultValidators(): void {
    var validators = [Validators.email];
    if(this.obrigatorio)
        validators.push(Validators.required);
    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  // Método para controlar a mudança de valor
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Método para lidar com a mudança no input
  handleInput(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    if (this.control) {
      this.control.setValue(value);
    }
  }

  hasError(){
    return FormUtil.isInvalid(this.control)
  }

  errorMsg(){
    return FormUtil.getErrorMessage(this.control)
  }    

}
