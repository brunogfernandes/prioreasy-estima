export class Teste {
    constructor(
      public numeroIdentificador: number,
      public nome: string,
      public sprint: number,
      public status: string,
      public objetivo: string,
      public entrada: string,
      public saida: string,
      public erro: string,
      public responsavelNome: string,
      public casoDeUsoNome: string,
      public id?: number // ID do teste (opcional, usado apenas quando necessário)
    ) {}
  }