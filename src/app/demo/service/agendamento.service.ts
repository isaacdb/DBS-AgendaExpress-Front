import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento, AgendamentoVisualizacaoWeek, SituacaoAtendimento } from '../models/agendamento';
import { environment } from 'src/environments/environment';

@Injectable()
export class AgendamentoService {
    constructor(private http: HttpClient) { }

    endpoint = environment.agendaExpress + '/AgendamentoEndpoints';
    
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
      
    getAll(inicio: Date, fim: Date): Observable<AgendamentoVisualizacaoWeek[]> {
        return this.http.get<AgendamentoVisualizacaoWeek[]>(`${this.endpoint}?inicio=${inicio.toISOString()}&fim=${fim.toISOString()}`)
    }

    getById(id: string): Observable<Agendamento> {
        return this.http.get<Agendamento>(`${this.endpoint}/${id}`)
    }    

    create(agendamento: Agendamento): Observable<string> {
        return this.http.post<string>(`${this.endpoint}`, JSON.stringify(agendamento), this.httpOptions)
    }

    delete(id: string) {
        return this.http.delete(`${this.endpoint}/${id}`, this.httpOptions)
    }   
    
    update(agendamento: Agendamento) {
        return this.http.put(`${this.endpoint}/${agendamento.id}`, JSON.stringify(agendamento), this.httpOptions)
    }  
    
    updateSituacao(id: string, situacao: SituacaoAtendimento) {
        const agend = {
            id: id,
            situacao: situacao
        } as Agendamento
        return this.http.put(`${this.endpoint}/${id}/Situacao`, JSON.stringify(agend), this.httpOptions)
    }      
}