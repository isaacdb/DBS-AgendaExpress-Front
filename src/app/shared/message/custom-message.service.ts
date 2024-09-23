import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api'; // Importa o serviço de mensagens do PrimeNG

@Injectable({
  providedIn: 'root' // Este serviço estará disponível globalmente
})
export class CustomMessageService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string = ''): void {
    let msg = message == '' ? 'Operação realizada com sucesso!' : message;
    this.messageService.add({
      severity: 'success',
      summary: 'Successo',
      detail: msg,
      life: 3000
    });
  }

  showError(message: string = ''): void {
    let msg = message == '' ? 'Erro ao completar operação!' : message;    
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: msg,
      life: 3000
    });
  }

  showCustomError(response: any): void {
    let msg = 'Erro ao completar operação!';
    if (response && response.error && response.error.detail){
      msg = response.error.detail;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      key: 'center',      
      detail: msg,
      life: 3000
    });
  }  

  warningCenter(message: string): void {
    let msg = message == '' ? 'Atenção!' : message;    
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: msg,
      key: 'center',
      life: 3000
    });
  }  
}
