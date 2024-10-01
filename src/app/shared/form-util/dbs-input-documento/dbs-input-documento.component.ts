import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ControlContainer, Validators } from '@angular/forms';
import { FormUtil } from '../form-util';

@Component({
  selector: 'dbs-input-documento',
  templateUrl: './dbs-input-documento.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DbsInputDocumentoComponent),
      multi: true
    }
  ]
})
export class DbsInputDocumentoComponent implements ControlValueAccessor, OnInit {
  @Input() control!: AbstractControl;
  @Input() obrigatorio: boolean = false;
  
  value: string = '';

  ngOnInit(): void {
    if (this.control) {
      this.setDefaultValidators();
    }
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  // Método para controlar a mudança de valor
  writeValue(value: string): void {
    this.value = value;
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

  // Definindo validações padrão
  private setDefaultValidators(): void {
    var validators = [Validators.minLength(11)];
    if(this.obrigatorio)
      validators.push(Validators.required);

    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

  hasError(){
    return FormUtil.isInvalid(this.control)
  }

  errorMsg(){
    return FormUtil.getErrorMessage(this.control)
  }    

}
