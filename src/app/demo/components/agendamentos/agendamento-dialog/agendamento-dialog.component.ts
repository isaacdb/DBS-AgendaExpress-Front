import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MultiSelectChangeEvent, MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';
import { Agendamento } from 'src/app/demo/models/agendamento';
import { Cliente } from 'src/app/demo/models/cliente';
import { Profissional } from 'src/app/demo/models/profissional';
import { Servico } from 'src/app/demo/models/servico';
import { AgendamentoService } from 'src/app/demo/service/agendamento.service';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { ProfissionalService } from 'src/app/demo/service/profissional.service';
import { ServicoService } from 'src/app/demo/service/servico.service';
import { FormUtil } from 'src/app/shared/form-util/form-util';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';
import { addMinutosToDate, getDateByHorario, getHorarioStringFromDate, validarFormatoHoraString } from 'src/app/utils/date-time-utils';

@Component({
    selector: 'app-agendamento-dialog',
    templateUrl: './agendamento-dialog.component.html',    
    styleUrls:['./agendamento-dialog.component.css']
})
export class AgendamentoDialogComponent implements OnInit {
    @Input() isOpen: boolean;
    @Input() agendamentoIdEdit: string;
    @Output() close: EventEmitter<any> = new EventEmitter();
    
    public isLoading: boolean = true;

    agendamentoForm: FormGroup;
    operacaoEfetuada: boolean;
    
    profissionais: Profissional[] = [];
    profissionaisHabilitados: Profissional[] = [];

    servicos: Servico[] = [];

    clientes: Cliente[] = [];
    selectAll: boolean = false;


    constructor(private agendamentoService: AgendamentoService,
        private profissionalService: ProfissionalService,
        private servicoService: ServicoService,
        private clienteService: ClienteService,
        private messageService: CustomMessageService,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder) 
    {   
        this.agendamentoForm = fb.group({
            id: [null],
            contratanteId: [null],
            cliente: [null, Validators.required],
            profissional: [null, Validators.required],
            servicos: [null, Validators.required],
            data: new FormControl<Date | null>(null),
            horaInicio: [null, Validators.required],
            horaFim: [null],
            duracao: [null, [Validators.required, Validators.min(0)]],
            valor: [null, Validators.required],
            observacao: [null],
        });
        
        this.inicializar();
    }

    ngOnInit() {
    }

    inicializar(){
        this.agendamentoForm.get('horaFim').disable();
        this.agendamentoForm.get('duracao').valueChanges.subscribe(x => {
            this.updateHoraFim()
        })
        this.agendamentoForm.get('horaInicio').valueChanges.subscribe(x => {
            this.updateHoraFim()
        })        

        this.servicoService.getAll().subscribe(data => { 
            this.servicos = data
            
            if (this.servicos.length == 1){
                this.agendamentoForm.get('servicos').setValue(this.servicos)
            }
        })
        this.profissionalService.getAll().subscribe(data => { 
            this.profissionais = data 
            this.profissionaisHabilitados = data 

            if (this.profissionais.length == 1){
                this.agendamentoForm.get('profissional').setValue(this.profissionais[0])
            }            
        })
    }

    onOpen(){
        if(this.agendamentoIdEdit){
            this.isLoading = true
            this.agendamentoService.getById(this.agendamentoIdEdit).subscribe({
              next: data => {
                this.agendamentoForm.patchValue(data)
                this.agendamentoForm.get('profissional').setValue(this.profissionais.find(x => x.id == data.profissionalId))
                this.agendamentoForm.get('servicos').setValue(this.servicos.filter(x => data.servicosId.some(s => s == x.id)))
                
                this.agendamentoForm.get('data').setValue(new Date(data.dataInicio))
                this.agendamentoForm.get('horaInicio').setValue(getHorarioStringFromDate(data.dataInicio))
                this.agendamentoForm.get('horaFim').setValue(getHorarioStringFromDate(addMinutosToDate(data.dataInicio, data.duracao)))
            },
            complete: () => {this.isLoading = false}
            })
        }
        else{
            this.isLoading = false
        }
    }

    updateHoraFim(){
        let duracao = this.agendamentoForm.get('duracao').value
        if (!duracao || duracao <= 0)
            duracao = 0

        let horaInicio = this.agendamentoForm.get('horaInicio').value
        if (!validarFormatoHoraString(horaInicio)){
            this.agendamentoForm.get('horaFim').reset()
            return
        }

        const dataInicio = getDateByHorario(horaInicio)
        this.agendamentoForm.get('horaFim').setValue(getHorarioStringFromDate(addMinutosToDate(dataInicio, duracao)))
    }

    completeAction(opEfetuada: boolean) {
        this.isOpen = false;        
        this.operacaoEfetuada = opEfetuada
    }
    
    onHide(){
        this.isOpen = false;
        this.agendamentoForm.reset();
        this.agendamentoIdEdit = null;
        this.close.emit(this.operacaoEfetuada);
        this.operacaoEfetuada = null;
    }

    saveAgendamento() {
        this.agendamentoForm.markAllAsTouched();
        if(this.agendamentoForm.invalid){
            return
        }

        const formResult = this.agendamentoForm.getRawValue()

        if (!validarFormatoHoraString(formResult.horaInicio)){
            this.messageService.warningCenter('Formato de horário inválido! Use formato 24H')            
            return;
        }

        let newDataInicio = new Date(formResult.data)
        newDataInicio.setHours(Number(formResult.horaInicio.substring(0,2)), Number(formResult.horaInicio.substring(3,5)))
        console.log("🚀 ~ AgendamentoDialogComponent ~ saveAgendamento ~ newDataInicio:", newDataInicio)

        let newDataFim = new Date(newDataInicio)
        newDataFim.setMinutes(newDataFim.getMinutes() + Number(formResult.duracao))

        let agendamentoToAdd = {
            id:  formResult.id,
            contratanteId: formResult.contratanteId,
            clienteId: formResult.cliente.id,
            profissionalId: formResult.profissional.id,
            servicosId: formResult.servicos.map(x => x.id),
            valor: formResult.valor,
            observacao: formResult.observacao,
            duracao: formResult.duracao,
            data: newDataInicio,
            dataFim: newDataFim
        } as Agendamento;

        if (agendamentoToAdd.id) {
            agendamentoToAdd.contratanteId = '5925f75e-8bd4-4bc4-be2c-f3b3d508298e'
            this.agendamentoService.update(agendamentoToAdd).subscribe({ 
                next: (res) => { 
                    this.messageService.showSuccess()
                },
                error: (er) => {
                     this.messageService.showCustomError(er) 
                },
                complete: () => this.completeAction(true)
            })
        } else {
            agendamentoToAdd.contratanteId = '5925f75e-8bd4-4bc4-be2c-f3b3d508298e'
            this.agendamentoService.create(agendamentoToAdd).subscribe({ 
                next: (res) => { 
                    this.messageService.showSuccess() 
                },
                error: (er) => {
                     this.messageService.showCustomError(er)
                },
                complete: () => this.completeAction(true)
            })            
        }
    }

    hasError(controlName: string){
        const control = this.agendamentoForm.get(controlName)
        return FormUtil.isInvalid(control)
    }

    errorMsg(controlName: string){
        const control = this.agendamentoForm.get(controlName)
        return FormUtil.getErrorMessage(control)
    }

    searchCliente(event: AutoCompleteCompleteEvent) {
        this.clienteService.getByNameLike(event.query).subscribe(data => {
            this.clientes = data
        })
    }

    onServicoSelectChange(event: MultiSelectChangeEvent){
        var lista = event.value as Servico[];
        
        const valorSomado = lista.reduce((n, {valor}) => n + valor, 0)
        const duracaoSomado = lista.reduce((n, {duracao}) => n + duracao, 0)
        
        this.agendamentoForm.get('valor').setValue(valorSomado)
        this.agendamentoForm.get('duracao').setValue(duracaoSomado)

        this.updateProfissionaisDisponiveis(lista)
    }

    updateProfissionaisDisponiveis(servicosSelecionados: Servico[]){
        this.profissionaisHabilitados = this.profissionais.filter(x => servicosSelecionados.every(z => x.servicos.some(s => s.id == z.id)))
        let profissionalControl = this.agendamentoForm.get('profissional')
        if (profissionalControl.value){
            if (!this.profissionaisHabilitados.some(x => x.id == profissionalControl.value.id)){
                profissionalControl.setValue(null)
                profissionalControl.markAsDirty();
            }
        }
    }

    onServicoSelectAllChange(event: MultiSelectSelectAllChangeEvent){
        this.selectAll = event.checked
        if (!event.checked){
            this.agendamentoForm.get('valor').setValue(0)
            this.agendamentoForm.get('duracao').setValue(0)
            this.agendamentoForm.get('servicos').setValue([])
            this.updateProfissionaisDisponiveis([])
            return
        }
        const valorSomado = this.servicos.reduce((n, {valor}) => n + valor, 0)
        const duracaoSomado = this.servicos.reduce((n, {duracao}) => n + duracao, 0)
        this.agendamentoForm.get('servicos').setValue(this.servicos)
        this.agendamentoForm.get('valor').setValue(valorSomado)
        this.agendamentoForm.get('duracao').setValue(duracaoSomado)
        this.updateProfissionaisDisponiveis(this.servicos)
    }
}
