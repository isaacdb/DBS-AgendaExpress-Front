import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudServicosComponent } from './crud-servicos/crud-servicos.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CrudServicosComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ServicosRoutingModule { }
