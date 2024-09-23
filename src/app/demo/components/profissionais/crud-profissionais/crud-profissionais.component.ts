import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DialogUtil } from 'src/app/shared/dialog/confirmation/confirm-dialog.service';
import { FormUtil } from 'src/app/shared/form-util/form-util';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';
import { DataView } from 'primeng/dataview';
import { DiaSemana, DiasSemana, Expediente } from 'src/app/demo/models/expediente';
import { ServicoService } from 'src/app/demo/service/servico.service';
import { Servico } from 'src/app/demo/models/servico';
import { Profissional, ProfissionalExpedientesUpdate, ProfissionalServicosUpdate } from 'src/app/demo/models/profissional';
import { ProfissionalService } from 'src/app/demo/service/profissional.service';
import { getDateByHorario, validacaoOrdemData, validarFormatoHoraString } from 'src/app/utils/date-time-utils';

@Component({
    templateUrl: './crud-profissionais.component.html',
})
export class CrudProfissionaisComponent implements OnInit {
    profissionalDialog: boolean = false;
    servicoDialog: boolean = false;
    expedienteDialog: boolean = false;

    tituloTabela: string = 'Profissionais new';

    profissionais: Profissional[] = [];
    rowsPerPageOptions = [5, 10, 20];
    
    profissionalForm: FormGroup;
    diasSemana: DiaSemana[] = DiasSemana;

    todosServicos: Servico[];
    servicosDisponiveis: Servico[];
    servicosSelecionados: Servico[];
    profissionalUpdate: Profissional;

    diaSelecionado: DiaSemana;
    horarioEntrada: string = '';
    horarioSaida: string = '';

    constructor(private profissionalService: ProfissionalService, 
        private messageService: CustomMessageService,
        private confirmationService: ConfirmationService,
        private servicoService: ServicoService,
        private fb: FormBuilder) 
    {
        this.inicializar();

        this.profissionalForm = fb.group({
            id: [null],
            contratanteId: [null],
            nome: [null, Validators.required],
            observacao: [null],
            telefone: [null],
            email: [null, [Validators.email]],
            documento: [null, []],
          });
    }

    ngOnInit() {
    }

    inicializar(){
        this.refreshList()
        this.servicoService.getAll().subscribe(data => {
            this.todosServicos = data
        })
    }

    refreshList(){
        this.profissionalService.getAll().subscribe(data => {
            this.profissionais = data
        })
    }

    openNew() {
        this.profissionalForm.reset();
        this.profissionalDialog = true;
    }

    editProduct(profissional: Profissional) {
        this.profissionalForm.reset();        
        this.profissionalForm.patchValue(profissional);
        this.profissionalDialog = true;
    }

    deleteProduct(profissional: Profissional) {
        this.confirmationService.confirm(DialogUtil.getConfirmationDialog(`Deseja excluir o cliente ${profissional.nome}?`,
            (() => { this.confirmDelete(profissional) }).bind(this), 
            () => {}
           )
       )
    }

    confirmDelete(profissional: Profissional) {        
        this.profissionalService.delete(profissional.id).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess() 
                this.refreshList()
            },
            error: (er) => { this.messageService.showError() },
        }) 
    }

    hideDialog() {
        this.profissionalDialog = false;
    }

    saveProduct() {
        this.profissionalForm.markAllAsTouched();
        if(this.profissionalForm.invalid){
            return
        }

        let profissionalToAdd = this.profissionalForm.getRawValue()

        if (profissionalToAdd.id) {
            profissionalToAdd.contratanteId = '5925f75e-8bd4-4bc4-be2c-f3b3d508298e'
            this.profissionalService.update(profissionalToAdd).subscribe({ 
                next: (res) => { 
                    this.messageService.showSuccess()
                    this.refreshList()
                },
                error: (er) => { this.messageService.showError() },
            })
        } else {
            profissionalToAdd.contratanteId = '5925f75e-8bd4-4bc4-be2c-f3b3d508298e'
            this.profissionalService.create(profissionalToAdd).subscribe({ 
                next: (res) => { 
                    this.messageService.showSuccess() 
                    this.refreshList()
                },
                error: (er) => { this.messageService.showError() },
            })
        }

        this.profissionais = [...this.profissionais];
        this.profissionalDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value, 'contains');
    }


    hasError(controlName: string){
        const control = this.profissionalForm.get(controlName)
        return FormUtil.isInvalid(control)
    }

    errorMsg(controlName: string){
        const control = this.profissionalForm.get(controlName)
        return FormUtil.getErrorMessage(control)
    }    

    //#region Servico

    openAddServicos(profissional: Profissional){
        this.servicosDisponiveis = this.todosServicos.filter(x => !profissional.servicos.some(s => s.id == x.id))
        this.servicosSelecionados = [];
        this.servicoDialog = true;
        this.profissionalUpdate = profissional;
    }
    
    hideServicoDialog() {
        this.servicoDialog = false;
    }

    updateProfissaServicos(){
        const listaAtualizada = this.servicosSelecionados.concat(this.profissionalUpdate.servicos);

        const request = {
            profissionalId: this.profissionalUpdate.id,
            servicosId: listaAtualizada.map(x => x.id)
        } as ProfissionalServicosUpdate
        
        this.profissionalService.updateProfissionalServicos(request).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess()
                this.profissionalUpdate.servicos = listaAtualizada;
            },
            error: (er) => { this.messageService.showError() },
            complete: () => { this.hideServicoDialog() },
        })        
    }

    removeServico(profissional: Profissional, servicoRemoved: Servico){
        const listaAtualizada = profissional.servicos.filter(s => s.id != servicoRemoved.id)

        const request = {
            profissionalId: profissional.id,
            servicosId: listaAtualizada.map(x => x.id)
        } as ProfissionalServicosUpdate
        
        this.profissionalService.updateProfissionalServicos(request).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess()                
                this.profissionais.find(x => x.id == profissional.id).servicos = listaAtualizada
            },
            error: (er) => { this.messageService.showError() },
            complete() {
            },
        })     
    }

    //#endregion


    //#region Expediente

    openAddExpediente(profissional: Profissional){
        this.profissionalUpdate = profissional;
        this.horarioEntrada = '08:00'
        this.horarioSaida = '18:00'        
        this.diaSelecionado = {
            diaValor: 0,
            diaDescricao: ''
        } as DiaSemana

        this.expedienteDialog = true;        
    }
    
    updateProfissaExpedientes(){
        const horariosFormatoValido = this.validarFormatoDatas();
        if(!horariosFormatoValido) return;

        const ordemDatasValidas = validacaoOrdemData(this.horarioEntrada, this.horarioSaida);
        if (!ordemDatasValidas){
            this.messageService.warningCenter('Horário de saída deve ser maior que o de entrada!')
            return;
        } 

        const horarioValido = this.validacaoConflitoExpedientes();
        if(!horarioValido) return;

        const listaAtualizada = new Array().concat(this.profissionalUpdate.expedientes)
        listaAtualizada.push({
            profissionalId: this.profissionalUpdate.id,
            diaSemana: this.diaSelecionado.diaValor,
            horarioEntrada: this.horarioEntrada + ':00',
            horarioSaida: this.horarioSaida + ':00'
        } as Expediente)

        const request = {
            profissionalId: this.profissionalUpdate.id,
            expedientes: listaAtualizada
        } as ProfissionalExpedientesUpdate
        
        this.profissionalService.updateProfissionalExpedientes(request).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess()
                this.profissionalUpdate.expedientes = res;
            },
            error: (er) => { this.messageService.showError() },
            complete: () => { this.hideExpedienteDialog() },
        })        
    }

    removeExpediente(profissional: Profissional, expediente: Expediente){
        const listaAtualizada = profissional.expedientes.filter(s => s.id != expediente.id)

        const request = {
            profissionalId: profissional.id,
            expedientes: listaAtualizada
        } as ProfissionalExpedientesUpdate
        
        this.profissionalService.updateProfissionalExpedientes(request).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess()                
                this.profissionais.find(x => x.id == profissional.id).expedientes = listaAtualizada
            },
            error: (er) => { this.messageService.showError() },
            complete() {
            },
        })     
    }

    hideExpedienteDialog() {
        this.expedienteDialog = false;
    }

    getExpedientesPorDia(expedientes: Expediente[], diaSemana: number): Expediente[]{
        return expedientes.filter(x => x.diaSemana == diaSemana)
    }

    validarFormatoDatas(): boolean{
        if (!validarFormatoHoraString(this.horarioEntrada) ||
            !validarFormatoHoraString(this.horarioSaida)){
            this.messageService.warningCenter('Formato de horário inválido! Use formato 24H')            
            return false;
        }

        return true;
    }

    validacaoConflitoExpedientes(){
        const expedientesDia = this.profissionalUpdate.expedientes.filter(x => x.diaSemana == this.diaSelecionado.diaValor)

        const dataEntrada = getDateByHorario(this.horarioEntrada)
        const dataSaida = getDateByHorario(this.horarioSaida)
        
        for (var i = 0; i < expedientesDia.length; i++){
            var exp = expedientesDia[i]
            const dataEntradaExp = getDateByHorario(exp.horarioEntrada);
            const dataSaidaExp = getDateByHorario(exp.horarioSaida);
            if (dataEntrada >= dataEntradaExp && dataEntrada <= dataSaidaExp ){
                console.log(dataEntrada, dataEntradaExp, dataSaida, dataSaidaExp)
                this.messageService.warningCenter('Horário conflita com outro horário ja definido2!')                
                return false
            }

            if (dataSaida >= dataEntradaExp && dataSaida <= dataSaidaExp){
                this.messageService.warningCenter('Horário conflita com outro horário ja definido!')                
                return false
            }
        }

        return true;
    }

    //#endregion
}
