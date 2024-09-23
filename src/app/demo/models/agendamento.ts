import { Profissional } from "./profissional";

export interface Agendamento {
    id?: string;
    contratanteId: string;
    clienteId?: string;
    profissionalId?: string;
    servicosId: string[];
    dataInicio?: Date;
    dataFim?: Date;
    duracao?: number;
    valor?: number;
    situacao?: SituacaoAtendimento;
    observacao?: string;
}

export enum SituacaoAtendimento {
    PENDENTE,
    FINALIZADO,
    REMARCADO,
    CANCELADO
}

export interface AgendamentoVisualizacaoWeek {
    id?: string;
    contratanteId?: string;
    clienteNome?: string;
    profissionalNome?: string;
    servicosNomes?: string[];
    dataInicio?: Date;
    dataFim?: Date;
    duracao?: number;
    valor?: number;
    situacao?: SituacaoAtendimento;
    observacao?: string;
}