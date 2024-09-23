import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardDto } from '../models/dashboard';
import { environment } from 'src/environments/environment';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) { }

    endpoint = environment.agendaExpress + '/DashboardEndpoints';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      
    get(inicio: Date, fim: Date): Observable<DashboardDto> {
        return this.http.get<DashboardDto>(`${this.endpoint}?inicio=${inicio.toISOString()}&fim=${fim.toISOString()}`)
    }
}