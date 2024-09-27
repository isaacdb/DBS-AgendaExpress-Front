import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/demo/service/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;

    constructor(public layoutService: LayoutService,
        private loginService: LoginService,
        private route: Router,
        private messageService: CustomMessageService,   
        private authService: AuthService,     
    ) { }

    login(){        
        this.loginService.login(this.email, this.password).subscribe(
            {
                next: res => {
                    if(!res.sucesso){
                        this.messageService.showError(res.erro)
                        return
                    }

                    this.authService.login(res)
                    this.messageService.showSuccessCenter()
                    this.route.navigate(['/'])
                },
                error: err => {

                }
            }
        )
    }
}
