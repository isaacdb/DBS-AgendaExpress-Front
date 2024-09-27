// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    this.userSubject.next(user);
  }

  login(login: LoginResponse) {
    localStorage.setItem('usuarioLogado', JSON.stringify(login.usuario));
    this.userSubject.next(login.usuario);
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.userSubject.next(null);
  }

  getUsuarioLogado() {
    return this.userSubject.value;
  }
}
