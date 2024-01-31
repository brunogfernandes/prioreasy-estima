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

    it('CT00 - Todos os campos válidos', () => {

        InserirCenario('Cenário 1', 'Alternativo', 'Descrição 1')

    });

    it('CT00 - Equivalência Inválida Nome do Cenário Tamanho Menor', () => {

        InserirCenario('C', 'Alternativo', 'Descrição 1')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Equivalência Inválida Nome do Cenário Tamanho Maior', () => {

        InserirCenario('Cenáriooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Alternativo', 'Descrição 1')

        cy.validator('Máximo de 100 caracteres.')

    });

    it('CT00 - Equivalência Inválida Nome do Cenário Nulo', () => {

        cy.get('#tipo').select('Alternativo')
        cy.get('#descricao').type('Descrição 1')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Tipo Nulo', () => {

        cy.get('#nome').type('Cenário')
        cy.get('#descricao').type('Descrição 1')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 -  Equivalência Inválida Descrição do Cenário Tamanho Menor', () => {

        InserirCenario('Cenário 1', 'Alternativo', 'D')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 -  Equivalência Inválida Descrição do Cenário Tamanho Maior', () => {

        InserirCenario('Cenário 1', 'Alternativo', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

        cy.validator('Máximo de 255 caracteres.')

    });

    it('CT00 - Equivalência Inválida Descrição do Cenário Nulo ', () => {

        cy.get('#nome').type('Cenário')
        cy.get('#tipo').select('Alternativo')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

});