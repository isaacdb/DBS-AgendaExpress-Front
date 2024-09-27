import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DashboardDto } from 'src/app/demo/models/dashboard';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { CustomMessageService } from 'src/app/shared/message/custom-message.service';
import { dateToDiaMes } from 'src/app/utils/date-time-utils';

@Component({
    templateUrl: './dashboard-financeiro.component.html',
    styleUrls: ['./dashboard-financeiro.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardFinanceiroComponent implements OnInit {
    
    dashboardData: DashboardDto;
    dadosFaturamento: any;
    dadosServicos: any;
    dadosProfissionais: any;
    options: any;

    constructor(private dashboardService: DashboardService, 
        private messageService: CustomMessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder) 
    {           
        this.inicializar();
    }

    ngOnInit() {
       
    }


    inicializar(){
        this.refreshList()
    }

    refreshList(){
        this.dashboardService.get(new Date(2024, 6, 1), new Date(2024, 6, 30)).subscribe({
            next: res => {
                this.dashboardData = res;
                this.updateGraficoData();
            },
            error: err => {}
        })
    }

    onDiaSelecionadoChange(event) {        
       // this.dataSelecionada = new Date(event)
        this.refreshList()
    }

    getClientesAtendidos(){
        
    }

    updateGraficoData(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.dadosFaturamento = {
            labels: this.dashboardData.faturamento.map(x => dateToDiaMes(x.data)),
            datasets: [
                {
                    label: 'Faturado',
                    data: this.dashboardData.faturamento.map(x => x.faturado),
                    fill: true,
                    tension: 0.1,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    backgroundColor: 'rgba(83, 235, 52,0.6)'                    
                },
                {
                    label: 'Cancelado',
                    data: this.dashboardData.faturamento.map(x => x.cancelado),
                    fill: true,
                    tension: 0.1,
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    backgroundColor: 'rgba(235, 64, 52,0.6)'
                }
            ]
        };

        this.dadosServicos = {
            labels: this.dashboardData.servicos.map(x => x.servicoNome),
            datasets:[                
                {
                    label: 'Faturado por serviço',
                    data: this.dashboardData.servicos.map(x => x.faturado),
                    fill: true,
                    tension: 0.1,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    borderWidth: 3,
                    backgroundColor: 'rgba(83, 235, 52,0.6)'
                },
            ]
        };

        let labelsProf = [];
        let datasetsProf = [];
        const profCount = this.dashboardData.profissionais[0].profissionaisVisaoDia.length;

        for (var i = 0; i < profCount; i++){

            datasetsProf.push({
                label: this.dashboardData.profissionais[0].profissionaisVisaoDia[i].nome,
                data: [],
                fill: true,
                tension: 0.1,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                borderWidth: 3,
                backgroundColor: this.getRandomColorRGBA()
            })
        }

        for (var i = 0; i < this.dashboardData.profissionais.length; i++){
            var dadosProfDia = this.dashboardData.profissionais[i];
            labelsProf.push(dateToDiaMes(dadosProfDia.data));
            for (var y = 0; y < profCount; y++){
                datasetsProf[y].data.push(dadosProfDia.profissionaisVisaoDia[y].faturado)
            }
        }

        this.dadosProfissionais = {
            labels: labelsProf,
            datasets: datasetsProf
        };        
        console.log("🚀 ~ DashboardFinanceiroComponent ~ updateGraficoData ~ this.dadosProfissionais:", this.dadosProfissionais)
        
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    getRandomColorHex() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getRandomColorRGBA() {
        const R = Math.random() * 255;
        const G = Math.random() * 255;
        const B = Math.random() * 255;

        return `rgba(${R}, ${G}, ${B}, 0.6)`        
    }
}
