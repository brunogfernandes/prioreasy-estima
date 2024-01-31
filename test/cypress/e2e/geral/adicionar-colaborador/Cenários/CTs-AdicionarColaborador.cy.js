
describe('Teste de Cenários - Adicionar Colaborador', () => {

    it('Testanto o caminho para chegar até os colaboradores', () => {
        
        //Sucesso
        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get(':nth-child(5) > .justify-center > :nth-child(1)').click()


    });
    // Otimizandoo o código para ir direto pro Dashboard de colabores, 
    // facilitando os testes de adição de colaborades

    beforeEach('Visitando Direto Dashboard Colaboradores', () => {
        
        cy.login()
        cy.wait(4000)
        cy.visit('http://localhost:4200/dashboard/projeto/8/colaboradores')
        cy.contains('button','Inserir Novo').click()

    });

    it('CT00 - Adicionar Colaborador com sucesso', () => {
        //Sucesso
        cy.get('#name').type('Colaborador 1')

        cy.contains('Colaborador 1').click()

        cy.contains('button', 'Adicionar Colaborador 1 ao Projeto').click()
    });
});