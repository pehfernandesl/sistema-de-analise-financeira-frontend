export interface Relatorio {
  total?: number;
  totalEntrada?: number;
  totalSaida?: number;
  operacoes?: Operacao[];
  dataMaisMovimentoPositivo?: Date;
  dataMaisMovimentoNegativo?: Date;
  dataMaisMovimento?: Date;
}

interface Operacao {
  tpOperacao?: number;
  valor?: number;
  percent?: number;
}
