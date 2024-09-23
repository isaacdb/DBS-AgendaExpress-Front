import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    endpoint = environment.authentication + '/UsuarioEndpoints';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      
    login(email: String, senha: String): Observable<LoginResponse> {
        console.log("🚀 ~ LoginService ~ login ~ email:", email)        
        console.log("🚀 ~ LoginService ~ login ~ this.endpoint:", this.endpoint)
        return this.http.post<LoginResponse>(`${this.endpoint}/login`,JSON.stringify({
            email,
            senha
        }), this.httpOptions)
    }
}