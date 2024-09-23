import { Component } from '@angular/core';
import { LoginService } from 'src/app/demo/service/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

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
        private loginService: LoginService
    ) { }

    login(){        
        this.loginService.login(this.email, this.password).subscribe(
            {
                next: res => {},
                error: err => {}
            }
        )
    }
}
