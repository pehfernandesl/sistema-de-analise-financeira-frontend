export interface Extrato{
  id?: {
    mesAno?: Date;
    tpBanco: number;
  };
  arquivoBase64: string;
  dataInclusao: Date;
}
