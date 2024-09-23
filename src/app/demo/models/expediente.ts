export interface Expediente {
    id?: string;
    profissionalId?: string;
    horarioEntrada?: string;
    horarioSaida?: string;
    diaSemana?: number;
}

export interface ExpedienteAuxUpdate {
    id?: string;
    profissionalId?: string;
    horarioEntrada?: string;
    horarioSaida?: string;
    diaSemana?: number;
}


export interface DiaSemana {
    diaValor: number;
    diaDescricao: string;
}

export const DiasSemana: DiaSemana[] = [{
        diaValor: 1,
        diaDescricao: 'Domingo'
    },
    {
        diaValor: 2,
        diaDescricao: 'Segunda'
    },
    {
        diaValor: 3,
        diaDescricao: 'Terça'
    },
    {
        diaValor: 4,
        diaDescricao: 'Quarta'
    },
    {
        diaValor: 5,
        diaDescricao: 'Quinta'
    },
    {
        diaValor: 6,
        diaDescricao: 'Sexta'
    },
    {
        diaValor: 7,
        diaDescricao: 'Sábado'
    }
]