import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profissional, ProfissionalExpedientesUpdate, ProfissionalServicosUpdate } from '../models/profissional';
import { Expediente } from '../models/expediente';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProfissionalService {
    constructor(private http: HttpClient) { }

    endpoint = environment.agendaExpress + '/ProfissionalEndpoints';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      
    getAll(): Observable<Profissional[]> {
        return this.http.get<Profissional[]>(`${this.endpoint}`)
    }

    create(profissional: Profissional): Observable<string> {
        return this.http.post<string>(`${this.endpoint}`, JSON.stringify(profissional), this.httpOptions)
    }

    delete(id: string) {
        return this.http.delete(`${this.endpoint}/${id}`, this.httpOptions)
    }   
    
    update(profissional: Profissional) {
        return this.http.put(`${this.endpoint}/${profissional.id}`, JSON.stringify(profissional), this.httpOptions)
    }
    
    updateProfissionalServicos(profissaServicos: ProfissionalServicosUpdate) {
        return this.http.put(`${this.endpoint}/UpdateServicos/${profissaServicos.profissionalId}`, JSON.stringify(profissaServicos), this.httpOptions)
    }    
    
    updateProfissionalExpedientes(profissaExpedientes: ProfissionalExpedientesUpdate) :Observable<Expediente[]> {
        return this.http.put<Expediente[]>(`${this.endpoint}/UpdateExpedientes/${profissaExpedientes.profissionalId}`, JSON.stringify(profissaExpedientes), this.httpOptions)
    }        
}