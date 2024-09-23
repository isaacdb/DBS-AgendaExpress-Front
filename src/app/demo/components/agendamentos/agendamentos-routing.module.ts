import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgendamentosSemanaComponent } from './agendamentos-semana/agendamentos-semana.component';
import { AgendamentosDiaComponent } from './agendamentos-dia/agendamentos-dia.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'semana', component: AgendamentosSemanaComponent },
        { path: 'dia', component: AgendamentosDiaComponent },        
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
