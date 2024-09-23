import { Agendamento } from "./agendamento";

export interface Pagamento {
    id: string;
    atendimento: Agendamento;
    valor: number;
    formaPagamento: FormaPagamento;
    situacao: SituacaoPagamento;
    data: Date;
}

export enum FormaPagamento {
    CREDITO,
    DEBITO,
    PIX,
    DINHEIRO,
}

export enum SituacaoPagamento {
    PAGO,
    PENDENTE,
}