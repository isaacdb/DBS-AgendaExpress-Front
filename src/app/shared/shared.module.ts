import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDeleteDialogComponent } from './dialog/excluir/confirm-delete-dialog.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { DbsInputNomeComponent } from './form-util/dbs-input-nome/dbs-input-nome.component';
import { DbsInputMoedaComponent } from './form-util/dbs-input-moeda/dbs-input-moeda.component';
import { DbsInputEmailComponent } from './form-util/dbs-input-email/dbs-input-email.component';
import { InputMaskModule } from 'primeng/inputmask';
import { DbsInputTelefoneComponent } from './form-util/dbs-input-telefone/dbs-input-telefone.component';
import { DbsInputDocumentoComponent } from './form-util/dbs-input-documento/dbs-input-documento.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule,
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
        InputMaskModule,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    declarations: [
        ConfirmDeleteDialogComponent,
        DbsInputNomeComponent,
        DbsInputMoedaComponent,
        DbsInputEmailComponent,
        DbsInputTelefoneComponent,
        DbsInputDocumentoComponent,
    ],
    exports:[
        ConfirmDeleteDialogComponent,
        DbsInputNomeComponent,
        DbsInputMoedaComponent,
        DbsInputEmailComponent,
        DbsInputTelefoneComponent,
        DbsInputDocumentoComponent,
    ]
})
export class MySharedModule { }
