import { NgModule } from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ClienteService } from './demo/service/cliente.service';
import { MySharedModule } from './shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServicoService } from './demo/service/servico.service';
import { NgxCurrencyConfig, NgxCurrencyInputMode, provideEnvironmentNgxCurrency } from 'ngx-currency';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfissionalService } from './demo/service/profissional.service';
import { AgendamentoService } from './demo/service/agendamento.service';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';

// Para usar a diretiva currency usando a formtação padrão sendo reais pt-Br
export const CustomCurrencyMaskConfig: NgxCurrencyConfig = {
    align: 'left',
    allowNegative: false,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: false,
    min: 0,
    max: 999999,
    inputMode: NgxCurrencyInputMode.Financial,
}

export const maskConfig: Partial<IConfig> = {
    validation: false,
  };

// Para usar as formatações com PIPE para datas em formatação pt-BR
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DashboardService } from './demo/service/dashboard.service';
import { LoginService } from './demo/service/login.service';
registerLocaleData(localePT);

@NgModule({
    declarations: 
    [
        AppComponent
    ],
    imports: 
    [
        AppRoutingModule,
        AppLayoutModule,
        MySharedModule,
        NoopAnimationsModule,
        NgxMaskDirective, 
        NgxMaskPipe,

    ],
    providers: 
    [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'dd/MM/yyyy'}},
        ClienteService,
        ProfissionalService,
        DashboardService,
        ServicoService,
        MessageService,
        AgendamentoService,
        ConfirmationService,
        LoginService,
        provideEnvironmentNgxCurrency(CustomCurrencyMaskConfig),
        provideEnvironmentNgxMask(maskConfig)
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
