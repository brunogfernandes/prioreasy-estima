function InserirProjeto(nome, desc, empre, status, dataIni, dataFim) {

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

    it('CT00 - Todos os campos válidos', () => {

        InserirProjeto('Projeto Teste 1@', 'Descrição 123 @', 'Empresa 123 @', 'Em andamenteo', '2023-12-22', '2024-11-12')

    });

    it('CT00 - Equivalência Inválida Nome Tamanho Menor', () => {

        InserirProjeto('Pro', 'Objetivo', 'Empresa', 'Em andamento', '2023-12-11', '2024-02-20')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Equivalência Inválida Nome Tamanho Maior', () => {

        InserirProjeto('Projetooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Descreição', 'Empresa', 'Em andamento', '2023-12-22', '2024-12-11')

        cy.validator('Máximo de 100 caracteres.')

    });

    it('CT00 - Equivalência Inválida Nome Nulo', () => {


        cy.get('#descricao').type('Descrição')
        cy.get('#empresa').type('Empresa')
        cy.get('#status').select('Em andamento')
        cy.get('#dataInicio').type('2023-11-20')
        cy.get('#previsaoFim').type('2024-12-20')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Descrição Menor', () => {

        InserirProjeto('Projeto', 'Des', 'Empresa', 'Em andamento', '2023-12-22', '2024-12-11')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Equivalência Inválida Descrição Maior', () => {

        InserirProjeto('Projeto', 'Descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Empresa', 'Em andamento', '2023-12-22', '2024-12-11')

        cy.validator('Máximo de 255 caracteres.')

    });

    it('CT00 - Equivalência Inválida Descrição Nula', () => {

        cy.get('#name').type('Projeto')
        cy.get('#empresa').type('Empresa')
        cy.get('#status').select('Em andamento')
        cy.get('#dataInicio').type('2023-11-20')
        cy.get('#previsaoFim').type('2024-12-20')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Empresa Menor', () => {

        InserirProjeto('Projeto', 'Descrição', 'Emp', 'Em andamento', '2023-12-22', '2024-12-11')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Equivalência Inválida Empresa Maior ', () => {

        InserirProjeto('Projeto', 'Descrição', 'Empresaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Em andamento', '2023-12-22', '2024-12-11')

        cy.validator('Máximo de 30 caracteres.')

    });

    it('CT00 - Equivalência Inválida Empresa Nula', () => {

        cy.get('#name').type('Projeto')
        cy.get('#descricao').type('Descrição')
        cy.get('#status').select('Em andamento')
        cy.get('#dataInicio').type('2023-11-20')
        cy.get('#previsaoFim').type('2024-12-20')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Status Nulo', () => {

        cy.get('#name').type('Projeto')
        cy.get('#descricao').type('Descrição')
        cy.get('#empresa').type('Empresa')
        cy.get('#dataInicio').type('2023-11-20')
        cy.get('#previsaoFim').type('2024-12-20')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Data Início Nula', () => {

        cy.get('#name').type('Projeto')
        cy.get('#descricao').type('Descrição')
        cy.get('#empresa').type('Empresa')
        cy.get('#status').select('Em andamento')
        cy.get('#previsaoFim').type('2024-12-20')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Data Previsão Nula', () => {

        cy.get('#name').type('Projeto')
        cy.get('#descricao').type('Descrição')
        cy.get('#empresa').type('Empresa')
        cy.get('#status').select('Em andamento')
        cy.get('#dataInicio').type('2023-11-20')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

});