import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosRoutingModule } from './servicos-routing.module';
import { MySharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CrudServicosComponent } from './crud-servicos/crud-servicos.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
    declarations: [CrudServicosComponent ],
    imports: [
        CommonModule,
        ServicosRoutingModule,
        MySharedModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        NgxCurrencyDirective,     
        ReactiveFormsModule,
        ConfirmDialogModule
    ]
})
export class ServicosModule { }
