import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServicoService {
    constructor(private http: HttpClient) { }

    endpoint = environment.agendaExpress + '/ServicoEndpoints';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      
    getAll(): Observable<Servico[]> {
        return this.http.get<Servico[]>(`${this.endpoint}`)
    }

    create(servico: Servico): Observable<string> {
        return this.http.post<string>(`${this.endpoint}`, JSON.stringify(servico), this.httpOptions)
    }

    delete(id: string) {
        return this.http.delete(`${this.endpoint}/${id}`, this.httpOptions)
    }   
    
    update(servico: Servico) {
        return this.http.put(`${this.endpoint}/${servico.id}`, JSON.stringify(servico), this.httpOptions)
    }       
}