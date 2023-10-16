export class StakeholderSignup {
  constructor(
    public nome: string,
    public email: string,
    public cargo: string,
    public senha: string,
    public confirmarSenha: string,
    public projeto_id: number,
    public id?: number
  ){}
}
