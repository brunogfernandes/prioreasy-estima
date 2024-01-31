function InserirProjeto(nome,desc,empre,status,dataIni,dataFim){

    cy.get('#name').type(nome)
    cy.get('#descricao').type(desc)
    cy.get('#empresa').type(empre)
    cy.get('#status').select(status)
    cy.get('#dataInicio').type(dataIni)
    cy.get('#previsaoFim').type(dataFim)

    cy.contains('button', 'Concluir Cadastro').click()

}
describe('Testando o cálculo da estimativa', () => {
    it('Testando', () => {

        const email = "testeestima@gmail.com";
        const senha = "test123@"

        cy.session([email, senha], () => {
            cy.visit('http://localhost:4200/collaborator-signin');
            cy.get('#email').type(email);
            cy.get('#password').type(senha);
            cy.contains('button', 'Efetuar Login').click()

            cy.url().should('include', 'http://localhost:4200/dashboard/projetos');
            

        })
        cy.contains('button', 'Inserir Novo').click()

        InserirProjeto('Projeto Estima', 'Testando Cálculo da Estimativa', 'Estima', 'Em andamento', '2023-12-12', '2024-12-12')
        

    });
});