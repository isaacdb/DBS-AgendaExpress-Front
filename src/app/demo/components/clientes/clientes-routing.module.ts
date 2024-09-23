import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudClientesComponent } from './crud-clientes/crud-clienes.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CrudClientesComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ClientesRoutingModule { }
