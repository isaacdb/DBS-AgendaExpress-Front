import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login';
import { CadastroContratante } from '../models/contratante';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    endpointUsuario = environment.authentication + '/UsuarioEndpoints';
    endpointContratante = environment.authentication + '/ContratanteEndpoints';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      
    login(email: String, senha: String): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.endpointUsuario}/login`,JSON.stringify({
            email,
            senha
        }), this.httpOptions)
    }

    register(contratante: CadastroContratante): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.endpointContratante}`,JSON.stringify(contratante), this.httpOptions)
    }    
}