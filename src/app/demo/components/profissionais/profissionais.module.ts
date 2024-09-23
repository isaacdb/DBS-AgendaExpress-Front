import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CrudProfissionaisComponent } from './crud-profissionais/crud-profissionais.component';
import { ProfissionaisRoutingModule } from './profissionais-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { InputMaskModule } from 'primeng/inputmask';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [CrudProfissionaisComponent],
    imports: [
        CommonModule,
        ProfissionaisRoutingModule,
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
        ConfirmDialogModule, 
        ReactiveFormsModule,
        DataViewModule,
        CardModule,
        InputMaskModule,
        DividerModule,
        ChipModule,
        AccordionModule,
        MultiSelectModule,
        CalendarModule,
    ]
})
export class ProfissionaisModule { }
