import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'agendamentos', loadChildren: () => import('./demo/components/agendamentos/agendamentos.module').then(m => m.AgendamentosModule) },
                    { path: 'clientes', loadChildren: () => import('./demo/components/clientes/clientes.module').then(m => m.ClientesModule) },
                    { path: 'profissionais', loadChildren: () => import('./demo/components/profissionais/profissionais.module').then(m => m.ProfissionaisModule) },
                    { path: 'servicos', loadChildren: () => import('./demo/components/servicos/servicos.module').then(m => m.ServicosModule) },
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
