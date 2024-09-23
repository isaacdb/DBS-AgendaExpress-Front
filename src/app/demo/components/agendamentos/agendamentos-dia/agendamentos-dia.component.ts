import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TabViewChangeEvent } from 'primeng/tabview';
import { Agendamento, AgendamentoVisualizacaoWeek, SituacaoAtendimento } from 'src/app/demo/models/agendamento';
import { DiaSemana, DiasSemana } from 'src/app/demo/models/expediente';
import { Profissional } from 'src/app/demo/models/profissional';
import { AgendamentoService } from 'src/app/demo/service/agendamento.service';
import { ProfissionalService } from 'src/app/demo/service/profissional.service';
import { DialogUtil } from 'src/app/shared/dialog/confirmation/confirm-dialog.service';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';

@Component({
    templateUrl: './agendamentos-dia.component.html',
    styleUrls: ['./agendamentos-dia.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AgendamentosDiaComponent implements OnInit {
    agendamentoDialog: boolean = false;

    agendamentos: AgendamentoVisualizacaoWeek[] = [];    
    agendamentoIdEdit: string;

    dataSelecionada: Date = new Date();

    diasSemana: DiaSemana[] = DiasSemana;
    situacoes: SituacaoAtendimento = SituacaoAtendimento.CANCELADO
    SituacaoAtendimento = SituacaoAtendimento;

    profissionais: Profissional[] = [];
    profSelecionado: Profissional;

    constructor(private agendamentoService: AgendamentoService, 
        private messageService: CustomMessageService,
        private confirmationService: ConfirmationService,
        private profissionalService: ProfissionalService,
        private fb: FormBuilder) 
    {           
        this.inicializar();
    }

    ngOnInit() {
    }

    inicializar(){
        this.refreshList()
        this.profissionalService.getAll().subscribe(data => { 
            this.profissionais = data
        })
    }

    refreshList(){
        this.agendamentos = [];
        this.agendamentoService.getAll(this.dataSelecionada, this.dataSelecionada).subscribe({
            next: data => {
            this.agendamentos = data
        },
        error: (er) => { this.messageService.showError() }})
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

    getAgendamentosPorProfissional(): AgendamentoVisualizacaoWeek[] {
        if (!this.profSelecionado) return this.agendamentos;
        return this.agendamentos.filter(x => x.profissionalNome == this.profSelecionado.nome)
    }

    getCardClasse(situacao: SituacaoAtendimento): { [key: string]: boolean } {
        return {
          'card-agenda-finalizado': situacao == SituacaoAtendimento.FINALIZADO,
          'card-agenda-cancelado': situacao == SituacaoAtendimento.CANCELADO,
          'card-agenda-pendente': situacao == SituacaoAtendimento.PENDENTE,
        };
    }

    onTabProfChange(event : TabViewChangeEvent){
        if(event.index == 0){
            this.profSelecionado = null;
            return;    
        }

        this.profSelecionado = this.profissionais[event.index - 1]
    }

    onDiaSelecionadoChange(event) {        
        this.dataSelecionada = new Date(event)
        this.refreshList()
    }

    getHeaderProf(prof: Profissional){
        if (!prof) return 'Erro'
        return `${prof.nome} (${this.agendamentos.filter(x => x.profissionalNome == prof.nome).length})`
    }

    getHeaderTodos(){
        return `Todos (${this.agendamentos.length})`
    }

    onChangeSituacao(agend: AgendamentoVisualizacaoWeek, novaSituacao: SituacaoAtendimento){
        let acao = '';
        if (novaSituacao == SituacaoAtendimento.CANCELADO)
            acao = 'cancelar'
        if (novaSituacao == SituacaoAtendimento.FINALIZADO)
            acao = 'finalizar'   

        this.confirmationService.confirm(DialogUtil.getConfirmationDialog(`Deseja <b>${acao}</b> o atendimento do cliente <b>${agend.clienteNome}</b> ?`,
            (() => { this.updateSituacao(agend.id, novaSituacao) }).bind(this), 
            () => {}
           )
       )
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

    getTotalValorAgendamentos(){
        return this.agendamentos.reduce((n, {valor}) => n + valor, 0)
    }
}
