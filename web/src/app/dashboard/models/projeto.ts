export class Projeto {
  constructor(
    public nome: string,
    public descricao: string,
    public empresa: string,
    public status: string,
    public dataInicio: Date,
    public previsaoFim: Date,
    public admin: boolean,
    public id?: number
  ){}
}
