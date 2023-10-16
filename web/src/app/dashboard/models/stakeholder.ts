export class Stakeholder {
  constructor(
    public nome: string,
    public email: string,
    public cargo: string,
    public chave: string,
    public participacaoRealizada: string,
    public alertaEmitido: string,
    public id?: number
  ){}
}
