export interface Usuario {
    contratanteId?: String;
    nome?: String;
    email?: String;
    documento?: String;
    telefone?: String;
    ativo?: boolean;    
    perfil?: Perfil;
}

export enum Perfil {
    ADMINISTRADOR,
    CONTRATANTE,
    USUARIO,
}

export interface LoginResponse {
    sucesso: boolean;
    usuario?: Usuario;
    erro?: string;
    token?: String;    
}