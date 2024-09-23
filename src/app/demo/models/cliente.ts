export interface Cliente {
    id?: string;
    contratanteId?: string;
    nome?: String;
    documento?: String;
    observacao?: string;
    telefone?: string;
    email?: string;
}

export enum CATEGORIA_PESSOA {
    CLIENTE,
    PROFISSIONAL
}