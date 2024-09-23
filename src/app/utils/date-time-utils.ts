
import * as moment from 'moment';
// Sobrescreve o método toJSON do prototype de Date
// Date.prototype.toJSON = function() {
//     return moment(this).format('YYYY-MM-DDTHH:mm:ss'); // Ajuste o formato conforme necessário
// };

export function dateToDiaMes(data: Date){
    return moment(data).format('DD/MM');
}

export function validacaoOrdemData(horarioEntrada: string, horarioSaida: string){
    const dataEntrada = new Date(2024, 1, 1, Number(horarioEntrada.substring(0, 2)), Number(horarioEntrada.substring(3, 5)))
    const dataSaida = new Date(2024, 1, 1, Number(horarioSaida.substring(0, 2)), Number(horarioSaida.substring(3, 5)))        
    
    if(dataEntrada >= dataSaida){
        return false;
    }

    return true;
}

export function validarFormatoHoraString(hora: string): boolean{
    if (!hora || hora.length < 5) return false
    if (Number(hora.substring(0,2)) > 23 ||
        Number(hora.substring(3,5)) > 59){
        return false;
    }

    return true;
}

export function getHorarioStringFromDate(data: Date): string {
    let hora = new Date(data).getHours().toString()
    let min = new Date(data).getMinutes().toString()
    
    return `${hora.padStart(2,'0')}:${min.padStart(2, '0')}`
}

export function addMinutosToDate(data: Date, minutos: number): Date{
    let newDate = new Date(data)
    newDate.setMinutes(newDate.getMinutes() + minutos)
    return newDate;
}

export function getDateByHorario(horario: string): Date {
    if (!horario || horario.length < 5) return null
    return new Date(2024, 1, 1, Number(horario.substring(0, 2)), Number(horario.substring(3, 5)))
}
