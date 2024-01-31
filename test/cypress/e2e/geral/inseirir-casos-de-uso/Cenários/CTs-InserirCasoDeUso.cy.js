function InserirCasoDeUso(nome, complexidade, desc){

    cy.get('#nome').type(nome)
    cy.get('#complexidade').select(complexidade)
    cy.get('#descricao').type(desc)

    cy.contains('button', 'Concluir Cadastro').click()
}

describe('Teste de Particionamento de Equivalência - Inserir Requisito', () => {

    it('Testanto o caminho para chegar até Casos de Uso', () => {

        //Sucesso
        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get(':nth-child(5) > .justify-center > :nth-child(1)').click()
        cy.contains('Requisitos Funcionais').click()
        cy.get('.border-b > .justify-center > :nth-child(1)').click()


    });
    // Otimizandoo o código para ir direto pro Dashboard de Casos de Uso, 
    // facilitando os testes de adição de colaborades

    beforeEach('Visitando Direto Dashboard os Casos de Uso', () => {

        cy.login()
        cy.wait(4000)
        cy.visit('http://localhost:4200/dashboard/projeto/8/requisitos/6/caso-de-uso')
        cy.contains('button', 'Inserir Novo').click()

    });
    
    it('CT00 - Cadastro de Caso de Uso com Sucesso ', () => {
        
        InserirCasoDeUso('Caso de Uso', 'Simples', 'Descrição 1')

    });

    it('CT00 - Cadastro sem sucesso, campo preenchido incorretamente', () => {

        InserirCasoDeUso('C', 'Simples', 'Descrição 1')

        cy.validator('Mínimo de 5 caracteres')

    });

    it('CT00 - Campos Obrigatórios Sem Preenchimento ', () => {
        
        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')
        
    });

});