import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosRoutingModule } from './agendamentos-routing.module';
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
import { InputMaskModule } from 'primeng/inputmask';
import { AgendamentosSemanaComponent } from './agendamentos-semana/agendamentos-semana.component';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AgendamentoDialogComponent } from './agendamento-dialog/agendamento-dialog.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { NgxCurrencyDirective } from 'ngx-currency';
import { AgendamentosDiaComponent } from './agendamentos-dia/agendamentos-dia.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';


@NgModule({
    declarations: [AgendamentosSemanaComponent, AgendamentoDialogComponent, AgendamentosDiaComponent],
    imports: [
        CommonModule,
        AgendamentosRoutingModule,
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
        InputMaskModule,
        CardModule,
        AutoCompleteModule,
        MultiSelectModule,
        CalendarModule,
        NgxCurrencyDirective,
        SkeletonModule,
        ProgressSpinnerModule,
        TabViewModule,
        TooltipModule,
        TagModule,
    ]
})
export class AgendamentosModule { }
