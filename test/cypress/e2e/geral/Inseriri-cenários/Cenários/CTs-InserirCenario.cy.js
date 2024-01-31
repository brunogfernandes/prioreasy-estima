function InserirCenario (nome,tipo,desc){

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
    
    it('CT00 - Cadastro com sucesso', () => {
        
        InserirCenario('Cenário','Principal', 'Descrição')
    
    });

    it('CT00 - Cadastro sem sucesso, campo preenchido incorretamente', () => {

        InserirCenario('C', 'Alternativo', 'Descrição 1')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Campos obrigatórios sem preencher', () => {

        cy.contains('button','Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

});