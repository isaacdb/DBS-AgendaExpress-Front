import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Agendamentos dia', icon: 'pi pi-fw pi-clock', routerLink: ['/agendamentos/dia'] },                    
                    { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: ['/clientes'] },
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-line', routerLink: ['/dashboard/financeiro'] },
                    { label: 'Profissionais', icon: 'pi pi-fw pi-briefcase', routerLink: ['/profissionais'] },                                        
                    { label: 'Servicos', icon: 'pi pi-fw pi-box', routerLink: ['/servicos'] },                    
                ]
            },            
        ];
    }
}
