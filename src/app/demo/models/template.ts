// import { Agendamento, SituacaoAtendimento } from "./agendamento";
// import { Cliente } from "./cliente";
// import { Expediente } from "./expediente";
// import { FormaPagamento, Pagamento, SituacaoPagamento } from "./pagamento";
// import { CATEGORIA_PESSOA, Cliente } from "./cliente";
// import { Profissional } from "./profissional";
// import { Servico } from "./servico";

// export const servicos: Servico[] = [
//     {
//         id: '1',
//         nome: 'Corte de Cabelo',
//         valor: 50.00,
//         duracao: 30, // duração em minutos
//         observacao: 'Corte padrão com acabamento'
//     },
//     {
//         id: '2',
//         nome: 'Coloração',
//         valor: 150.00,
//         duracao: 90,
//         observacao: 'Coloração completa com tinta de qualidade'
//     },
//     {
//         id: '3',
//         nome: 'Tratamento Capilar',
//         valor: 80.00,
//         duracao: 45,
//         observacao: 'Tratamento nutritivo e revitalizante'
//     }
// ];

// export const pessoas: Cliente[] = [
//     {
//         id: '1',
//         nome: 'Maria Silva',
//         documento: '123.456.789-00',
//         observacao: 'Cliente frequente, prefere horários pela manhã',
//         telefone: '99098528',
//         email: 'email@treste.com',
//         contratanteId: '3',
//         categoria: CATEGORIA_PESSOA.CLIENTE,
//     },
//     {
//         id: '2',
//         nome: 'João Santos',
//         documento: '987.654.321-00',
//         observacao: 'Prefere atendimentos rápidos e pontuais',
//         telefone: '253543534',
//         email: '783783783@treste.com',
//         contratanteId: '3',
//         categoria: CATEGORIA_PESSOA.CLIENTE,
//     },
//     {
//         id: '3',
//         nome: 'Ana Oliveira',
//         documento: '456.789.123-00',
//         observacao: 'Sempre solicita serviços de coloração',
//         telefone: '3543453',
//         email: 'email@tr45345este.com',
//         contratanteId: '3',
//         categoria: CATEGORIA_PESSOA.CLIENTE,
//     }
// ];


// export const expedientes: Expediente[] = [
//     {
//         id: '1',
//         profissionalId: '1',
//         horarioEntrada: new Date('2024-08-12T08:00:00'),
//         horarioSaida: new Date('2024-08-12T17:00:00'),
//         diaSemana: 1 // Segunda-feira
//     },
//     {
//         id: '2',
//         profissionalId: '2',
//         horarioEntrada: new Date('2024-08-12T10:00:00'),
//         horarioSaida: new Date('2024-08-12T19:00:00'),
//         diaSemana: 2 // Terça-feira
//     },
//     {
//         id: '3',
//         profissionalId: '1',
//         horarioEntrada: new Date('2024-08-12T08:00:00'),
//         horarioSaida: new Date('2024-08-12T14:00:00'),
//         diaSemana: 3 // Quarta-feira
//     }
// ];


// export const atendimentos: Agendamento[] = [
//     {
//         id: '1',
//         profissional: { id: '1', pessoa: pessoas[0], expedientes: [expedientes[0]], servicos: [servicos[0]] },
//         servicos: [servicos[0]],
//         data: new Date('2024-08-12T09:00:00'),
//         duracao: 30,
//         situacao: SituacaoAtendimento.FINALIZADO
//     },
//     {
//         id: '2',
//         profissional: { id: '2', pessoa: pessoas[1], expedientes: [expedientes[1]], servicos: [servicos[1]] },
//         servicos: [servicos[1]],
//         data: new Date('2024-08-12T11:00:00'),
//         duracao: 90,
//         situacao: SituacaoAtendimento.PENDENTE
//     }
// ];


// export const pagamentos: Pagamento[] = [
//     {
//         id: '1',
//         atendimento: atendimentos[0],
//         valor: 50.00,
//         formaPagamento: FormaPagamento.DINHEIRO,
//         situacao: SituacaoPagamento.PAGO,
//         data: new Date('2024-08-12T09:30:00')
//     },
//     {
//         id: '2',
//         atendimento: atendimentos[1],
//         valor: 150.00,
//         formaPagamento: FormaPagamento.CREDITO,
//         situacao: SituacaoPagamento.PENDENTE,
//         data: new Date('2024-08-12T11:30:00')
//     }
// ];


// export const profissionais: Profissional[] = [
//     {
//         id: '1',
//         expedientes: [expedientes[0], expedientes[2]],
//         servicos: [servicos[0], servicos[2]]
//     },
//     {
//         id: '2',
//         expedientes: [expedientes[1]],
//         servicos: [servicos[1]]
//     }
// ];


// export const clientes: Cliente[] = [
//     {
//         id: '1',
//     },
//     {
//         id: '2',
//     }
// ];
