import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/demo/service/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    form: FormGroup;

    constructor(public layoutService: LayoutService,
        private loginService: LoginService,
        private fb: FormBuilder,
        private route: Router,
        private messageService: CustomMessageService,        
    ) 
    {
        this.form = fb.group({
            nome: [null, [Validators.required]],
            documento: [null, [Validators.required]],
            telefone: [null, Validators.required],
            senha: [null, [Validators.required]],
            email: [null, [Validators.email]],
        });

    }

    register(){
        if(!this.form.valid){
            console.log(this.form)
            return
        }

        var registerObj = this.form.getRawValue();

        this.loginService.register(registerObj).subscribe(
            {
                next: res => {
                    this.messageService.showSuccess('Cadastro realizado com sucesso!')
                    this.route.navigate(['auth/login'])
                },
                error: err => {
                    this.messageService.showError()
                }
            }
        )
    }
}
