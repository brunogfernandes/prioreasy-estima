function InserirProjeto(nome,desc,empre,status,dataIni,dataFim){

    cy.get('#name').type(nome)
    cy.get('#descricao').type(desc)
    cy.get('#empresa').type(empre)
    cy.get('#status').select(status)
    cy.get('#dataInicio').type(dataIni)
    cy.get('#previsaoFim').type(dataFim)

    cy.contains('button', 'Concluir Cadastro').click()

}

describe('Teste de Cenários - Inserir Projeto', () => {
    
    beforeEach('Realiando login', () => {

        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get('.justify-between > .rounded-md').click()
        
    });

    it('CT00 - Cadastro de Projeto com sucesso', () => {

        InserirProjeto('Projeto Teste', 'Objetivo', 'Empresa', 'Em andamento', '2023-12-11', '2024-02-20')

    });

    it('CT00 - Cadastro de Projeto Falha Preenchimento de Campo Incorreto', () => {

        InserirProjeto('Pro', 'Objetivo', 'Empresa', 'Em andamento', '2023-12-11', '2024-02-20')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Cadastro de Projeto Falha Campo Sem Preencher', () => {

        cy.contains('button', 'Concluir Cadastro')

        cy.validator('Campo obrigatório').click()
        
    });
    
});