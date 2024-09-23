import { Expediente } from "./expediente";
import { Servico } from "./servico";

export interface Profissional {
    id?: string;
    contratanteId?: string;
    nome?: String;
    documento?: String;
    observacao?: string;
    telefone?: string;
    email?: string;
    ativo?: boolean;
    expedientes?: Expediente[];
    servicos?: Servico[];
}

export interface ProfissionalServicosUpdate {
    profissionalId: string;
    servicosId: string[];
}

export interface ProfissionalExpedientesUpdate {
    profissionalId: string;
    expedientes: Expediente[];
}