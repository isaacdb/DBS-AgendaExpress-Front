export interface DashboardDto
{
    inicio: Date,
    fim: Date,
    faturamento: DashboardFaturamentoDto[],
    servicos: DashboardServicosDto[],
    visaoGeral: DashboardVisaoGeralDto,
    profissionais: DashboardProfissionaisDto[],
}

export interface DashboardFaturamentoDto
{
    data: Date,
    faturado: number,
    cancelado: number,
}

export interface DashboardServicosDto
{
    servicoNome: string,
    quantidade: number,
    faturado: number,
}

export interface DashboardVisaoGeralDto
{
    atendimentos: number,
    faturamentoRealizado: number,
    cancelamentos: number,
    faturamentoCancelado: number,
    pendentes: number,
    faturamentoPendente: number,
}

export interface DashboardProfissionaisDto
{
    data: Date,
    profissionaisVisaoDia: ProfissaVisaoDiaDto[]
}

export interface ProfissaVisaoDiaDto
{
    nome: string,
    faturado: number,
    cancelado: number,
}