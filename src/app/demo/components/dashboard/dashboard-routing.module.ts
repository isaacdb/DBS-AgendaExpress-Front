import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardFinanceiroComponent } from './financeiro/dashboard-financeiro.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'financeiro', component: DashboardFinanceiroComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
