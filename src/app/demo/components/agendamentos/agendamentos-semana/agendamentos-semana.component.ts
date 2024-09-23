import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Agendamento, AgendamentoVisualizacaoWeek, SituacaoAtendimento } from 'src/app/demo/models/agendamento';
import { DiaSemana, DiasSemana } from 'src/app/demo/models/expediente';
import { AgendamentoService } from 'src/app/demo/service/agendamento.service';
import { DialogUtil } from 'src/app/shared/dialog/confirmation/confirm-dialog.service';
import { FormUtil } from 'src/app/shared/form-util/form-util';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';

@Component({
    templateUrl: './agendamentos-semana.component.html',
    styleUrls: ['./agendamentos-semana.component.css']
})
export class AgendamentosSemanaComponent implements OnInit {
    agendamentoDialog: boolean = false;

    agendamentos: AgendamentoVisualizacaoWeek[] = [];    
    agendamentoIdEdit: string;

    diasSemana: DiaSemana[] = DiasSemana;
    situacoes: SituacaoAtendimento = SituacaoAtendimento.CANCELADO

    constructor(private agendamentoService: AgendamentoService, 
        private messageService: CustomMessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder) 
    {           
        this.inicializar();
    }

    ngOnInit() {
    }

    inicializar(){
        this.refreshList()
    }

    refreshList(){
        this.agendamentoService.getAll(new Date(), new Date()).subscribe(data => {
            this.agendamentos = data
        })
    }

    openNew() {
        this.agendamentoDialog = true;
    }

    editAgendamento(agendamento: AgendamentoVisualizacaoWeek) {
        this.agendamentoIdEdit = agendamento.id;
        this.agendamentoDialog = true;
    }

    onDialogClose(event){
        this.agendamentoDialog = false
        if(event) this.refreshList();
    }

    deleteAgendamento(agendamento: Agendamento) {
        this.confirmationService.confirm(DialogUtil.getConfirmationDialog(`Deseja excluir esse agendamento?`,
            (() => { this.confirmDelete(agendamento) }).bind(this), 
            () => {}
           )
       )
    }

    confirmDelete(agendamento: Agendamento) {        
        this.agendamentoService.delete(agendamento.id).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess() 
                this.refreshList()
            },
            error: (er) => { this.messageService.showError() },
        }) 
    }

    hideDialog() {
        this.agendamentoDialog = false;
    }
    
    getAgendamentosPorDia(diaSemana: number): AgendamentoVisualizacaoWeek[] {
        return this.agendamentos.filter(x => new Date(x.dataInicio).getDay() == diaSemana)
    }

    updateSituacao(agendaId: string, novaSituacao: SituacaoAtendimento){
        this.agendamentoService.updateSituacao(agendaId, novaSituacao).subscribe({ 
            next: (res) => { 
                this.messageService.showSuccess() 
                this.refreshList()
            },
            error: (er) => { this.messageService.showError() },
        }) 
    }
}
