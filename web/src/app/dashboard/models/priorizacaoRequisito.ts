export class PriorizacaoRequisito {
  constructor(
    public nome: string,
    public especificacao: string,
    public numeroIdentificador: number,
    public respostaPositiva: string,
    public respostaNegativa: string,
    public classificacaoRequisito: string,
    public id?: number,
  ){}
}
