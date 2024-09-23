import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cliente } from 'src/app/demo/models/cliente';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { DialogUtil } from 'src/app/shared/dialog/confirmation/confirm-dialog.service';
import { FormUtil } from 'src/app/shared/form-util/form-util';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';

@Component({
    templateUrl: './crud-clientes.component.html',
})
export class CrudClientesComponent implements OnInit {
    clienteDialog: boolean = false;

    clientes: Cliente[] = [];
    rowsPerPageOptions = [5, 10, 20];
    
    clienteForm: FormGroup;

    constructor(private clienteService: ClienteService, 
        private messageService: CustomMessageService,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder) 
    {   
        this.clienteForm = fb.group({
            id: [null],
            contratanteId: [null],
            nome: [null, Validators.required],
            observacao: [null],
            telefone: [null],
            email: [null, [Validators.email]],
            documento: [null, []],
        });
        
        this.inicializar();
    }

    ngOnInit() {
    }

    inicializar(){
        this.refreshList()
    }

    refreshList(){
        this.clienteService.getAll().subscribe(data => {
            this.clientes = data
        })
    }

    openNew() {
        this.clienteForm.reset();
        this.clienteDialog = true;
    }

    editCliente(pessoa: Cliente) {
        this.clienteForm.reset();        
        this.clienteForm.patchValue(pessoa);
        this.clienteDialog = true;
    }

    deleteCliente(cliente: Cliente) {
        this.confirmationService.confirm(DialogUtil.getConfirmationDialog(`Deseja excluir o cliente ${cliente.nome}?`,
            (() => { this.confirmDelete(cliente) }).bind(this), 
            () => {}
           )
       )
    }

    confirmDelete(cliente: Cliente) {        
        this.clienteService.delete(cliente.id).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess() 
                this.refreshList()
            },
            error: (er) => { this.messageService.showError() },
        }) 
    }

    hideDialog() {
        this.clienteDialog = false;
    }

    saveCliente() {
        this.clienteForm.markAllAsTouched();
        if(this.clienteForm.invalid){
            console.log("🚀 ~ CrudPessoasComponent ~ saveProduct ~ this.pessoaForm:", this.clienteForm)
            return
        }

        let clienteToAdd = this.clienteForm.getRawValue()

        if (clienteToAdd.id) {
            clienteToAdd.contratanteId = '5925f75e-8bd4-4bc4-be2c-f3b3d508298e'
            this.clienteService.update(clienteToAdd).subscribe({ 
                next: (res) => { 
                    this.messageService.showSuccess()
                    this.refreshList()
                },
                error: (er) => { this.messageService.showError() },
            })
        } else {
            clienteToAdd.contratanteId = '5925f75e-8bd4-4bc4-be2c-f3b3d508298e'
            this.clienteService.create(clienteToAdd).subscribe({ 
                next: (res) => { 
                    this.messageService.showSuccess() 
                    this.refreshList()
                },
                error: (er) => { this.messageService.showError() },
            })            
        }

        this.clientes = [...this.clientes];
        this.clienteDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hasError(controlName: string){
        const control = this.clienteForm.get(controlName)
        return FormUtil.isInvalid(control)
    }

    errorMsg(controlName: string){
        const control = this.clienteForm.get(controlName)
        return FormUtil.getErrorMessage(control)
    }    
}
