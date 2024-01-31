function InserirAtor(nome, complexidade, desc) {

    cy.get('#nome').type(nome)
    cy.get('#complexidade').select(complexidade)
    cy.get('#descricao').type(desc)

    cy.contains('button', 'Concluir Cadastro').click()

}


describe('Teste de Cenários - Inserir Ator', () => {
    it('Visitando o dashboard dos Atores', () => {

        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get(':nth-child(5) > .justify-center > :nth-child(1)').click()
        cy.get(':nth-child(2) > .inline-flex').click()
        cy.get(':nth-child(3) > .p-4').click()

    });

    beforeEach('Visitando direto o dasboard atores', () => {

        cy.login()
        cy.visit('http://localhost:4200/dashboard/projeto/8/atores')
        cy.contains('button', 'Inserir Novo').click()

    });

    it('CT00 - Todos os campo válidos ', () => {

        InserirAtor('Nome Ator', 'Simples', 'Descrição')

    });

    it('CT00 - Equivalência Inválida Nome Ator Tamanho Menor', () => {

        InserirAtor('Ator', 'Simples', 'Descrição')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Equivalência Inválida Nome Ator Tamanho Maior', () => {

        InserirAtor('Atorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 'Simples', 'Descrição')

        cy.validator('Máximo de 100 caracteres.')

    });

    it('CT00 - Equivalência Inválida Nome Ator Nulo', () => {

        cy.get('#complexidade').select('Simples')
        cy.get('#descricao').type('Descrição')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Complexidade Nulo', () => {

        cy.get('#nome').type('Nome Ator')
        cy.get('#descricao').type('Descrição')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Descrição Ator Tamanho Menor', () => {

        InserirAtor('Nome Ator', 'Simples', 'D')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Equivalência Inválida Descrição Ator Tamanho Maior', () => {

        InserirAtor('Nome Ator', 'Simples', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

        cy.validator('Máximo de 255 caracteres.')

    });

    it('CT00 - Equivalência Inválida Descrição Ator Nulo', () => {

        cy.get('#nome').type('Nome Ator')
        cy.get('#complexidade').select('Simples')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

});