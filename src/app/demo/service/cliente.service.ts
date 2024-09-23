import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClienteService {
    constructor(private http: HttpClient) { }

    endpoint = environment.agendaExpress + '/ClienteEndpoints';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      
    getAll(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(`${this.endpoint}`)
    }

    getById(id: string): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.endpoint}/${id}`)
    }    

    getByNameLike(filter: string): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(`${this.endpoint}/FilterName?filter=${filter}`)
    }

    create(pessoa: Cliente): Observable<string> {
        return this.http.post<string>(`${this.endpoint}`, JSON.stringify(pessoa), this.httpOptions)
    }

    delete(id: string) {
        return this.http.delete(`${this.endpoint}/${id}`, this.httpOptions)
    }   
    
    update(pessoa: Cliente) {
        return this.http.put(`${this.endpoint}/${pessoa.id}`, JSON.stringify(pessoa), this.httpOptions)
    }   
}