export class PriorizacaoRequest {
  constructor(
      public requisito: number,
      public respostaPositiva: string,
      public respostaNegativa: string,
      public classificacaoRequisito: string,
  ) { }
}
