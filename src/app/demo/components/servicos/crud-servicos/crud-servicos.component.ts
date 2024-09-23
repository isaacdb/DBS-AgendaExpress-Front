import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Servico } from 'src/app/demo/models/servico';
import { ServicoService } from 'src/app/demo/service/servico.service';
import { DialogUtil } from 'src/app/shared/dialog/confirmation/confirm-dialog.service';
import { FormUtil } from 'src/app/shared/form-util/form-util';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';

@Component({
    templateUrl: './crud-servicos.component.html',
})
export class CrudServicosComponent implements OnInit {
    editDialog: boolean = false;

    servicos: Servico[] = [];

    rowsPerPageOptions = [5, 10, 20];
    dialogVisible: boolean;

    servicoForm: FormGroup;

    constructor(private ServicoService: ServicoService, 
        private messageService: CustomMessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder) 
    { 
        this.servicoForm = fb.group({
            id: [null],
            contratanteId: [null],
            nome: [null, Validators.required],
            observacao: [null],
            duracao: [0, [Validators.required, Validators.min(0)]],
            valor: [0, [Validators.required, Validators.min(0)]]
          });
    }

    ngOnInit() {
        this.inicializar()
    }

    inicializar(){
        this.refreshList()
    }

    refreshList(){
        this.ServicoService.getAll().subscribe(data => {
            this.servicos = data
        })
    }

    openNew() {
        this.servicoForm.reset()
        this.editDialog = true;
    }

    editProduct(servico: Servico) {
        this.servicoForm.reset()
        this.servicoForm.patchValue(servico)
        this.editDialog = true;
    }

    deleteProduct(servico: Servico) {
        this.confirmationService.confirm(DialogUtil.getConfirmationDialog(`Deseja excluir o serviço ${servico.nome}?`,
             (() => { this.confirmDelete(servico) }).bind(this), 
             () => {}
            )
        )
    }

    confirmDelete(servico: Servico) {
        this.ServicoService.delete(servico.id).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess() 
                this.refreshList()
            },
            error: (er) => { this.messageService.showError() },
        })
    }

    hideDialog() {
        this.editDialog = false;
    }

    saveProduct() {
        this.servicoForm.markAllAsTouched();
        if(this.servicoForm.invalid){
            return
        }

        let servicoToAdd = this.servicoForm.getRawValue()

        if (servicoToAdd.id) {
            servicoToAdd.contratanteId = '5925f75e-8bd4-4bc4-be2c-f3b3d508298e'
            this.ServicoService.update(servicoToAdd).subscribe({ 
                next: (res) => { 
                    this.messageService.showSuccess()
                    this.refreshList()
                    },
                error: (er) => { this.messageService.showError() },
            })
        } else {
            servicoToAdd.contratanteId = '5925f75e-8bd4-4bc4-be2c-f3b3d508298e'
            this.ServicoService.create(servicoToAdd).subscribe({ 
                next: (res) => { 
                    this.messageService.showSuccess() 
                    this.refreshList()
                },
                error: (er) => { this.messageService.showError() },
            })
        }
        
        this.servicos = [...this.servicos];
        this.editDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hasError(controlName: string){
        const control = this.servicoForm.get(controlName)
        return FormUtil.isInvalid(control)
    }

    errorMsg(controlName: string){
        const control = this.servicoForm.get(controlName)
        return FormUtil.getErrorMessage(control)
    }
}
