function InserirCenario(nome, tipo, desc) {

    cy.get('#nome').type(nome)
    cy.get('#tipo').select(tipo)
    cy.get('#descricao').type(desc)

    cy.contains('button', 'Concluir Cadastro').click()
}
describe('Teste de Particionamento de Equivalência - Inserir Requisito', () => {

    it('Testanto o caminho para chegar até Cenários', () => {

        //Sucesso
        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get(':nth-child(5) > .justify-center > :nth-child(1)').click()
        cy.contains('Requisitos Funcionais').click()
        cy.get('.border-b > .justify-center > :nth-child(1)').click()
        cy.get(':nth-child(1) > .justify-center > .bg-violet-700').click()


    });
    // Otimizandoo o código para ir direto pro Dashboard de Casos de Uso, 
    // facilitando os testes de adição de colaborades

    beforeEach('Visitando Direto Dashboard os Casos de Uso', () => {

        cy.login()
        cy.wait(4000)
        cy.visit('http://localhost:4200/dashboard/projeto/8/requisitos/6/caso-de-uso/2/cenarios')
        cy.contains('button', 'Inserir Novo').click()

    });

    it('CT00 -  Nome do Cenário Limite Inferior Menos Um', () => {
        
        InserirCenario('Cena', 'Alternativo', 'Descrição')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 -  Nome do Cenário Limite Inferior Igual', () => {
        
        InserirCenario('Cenar', 'Alternativo', 'Descrição')

    });

    it('CT00 -  Nome do Cenário Limite Inferior Mais Um', () => {
        
        InserirCenario('Cenari', 'Alternativo', 'Descrição')

    });

    it('CT00 -  Nome do Cenário Limite Superior Menos Um', () => {
        
        InserirCenario('Cenariooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Alternativo', 'Descrição')

    });
    
    it('CT00 -  Nome do Cenário Limite Superior Igual', () => {
        
        InserirCenario('Cenarioooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Alternativo', 'Descrição')

    });

    it('CT00 -  Nome do Cenário Limite Superior Mais Um', () => {
        
        InserirCenario('Cenariooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Alternativo', 'Descrição')

        cy.validator('Máximo de 100 caracteres.')

    });

    it('CT00 - Descrição do Cenário Limite Inferior Menos Um', () => {

        InserirCenario('Cenário', 'Alternativo', 'Desc')
        
        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Descrição do Cenário Limite Inferior Igual', () => {

        InserirCenario('Cenário', 'Alternativo', 'Descr')
        
    });

    it('CT00 - Descrição do Cenário Limite Inferior Menos Um', () => {

        InserirCenario('Cenário', 'Alternativo', 'Descri')
        
    });

    it('CT00 - Descrição do Cenário Limite Superior Menos Um', () => {

        InserirCenario('Cenário', 'Alternativo', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
        
    });

    it('CT00 - Descrição do Cenário Limite Superior Igual', () => {

        InserirCenario('Cenário', 'Alternativo', 'Descriçãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
        
    });

    it('CT00 - Descrição do Cenário Limite Superior Igual', () => {

        InserirCenario('Cenário', 'Alternativo', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
        
        cy.validator('Máximo de 255 caracteres.')

    });

});