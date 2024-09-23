import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudProfissionaisComponent } from './crud-profissionais/crud-profissionais.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CrudProfissionaisComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProfissionaisRoutingModule { }
