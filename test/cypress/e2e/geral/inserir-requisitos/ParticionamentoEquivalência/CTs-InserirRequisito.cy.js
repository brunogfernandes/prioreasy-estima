function InserirRequisito(num, nome, espec) {

    cy.get('#numeroIdentificador').type(num)
    cy.get('#name').type(nome)
    cy.get('#especificacao').type(espec)

    cy.contains('button', 'Concluir Cadastro').click()
}


describe('Teste de Particionamento de Equivalência - Inserir Requisito', () => {

    it('Testanto o caminho para chegar até Requisitos', () => {

        //Sucesso
        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get(':nth-child(5) > .justify-center > :nth-child(1)').click()
        cy.contains('Requisitos Funcionais').click()


    });
    // Otimizandoo o código para ir direto pro Dashboard de Requisitos Funcionais, 
    // facilitando os testes de adição de colaborades

    beforeEach('Visitando Direto Dashboard Colaboradores', () => {

        cy.login()
        cy.wait(4000)
        cy.visit('http://localhost:4200/dashboard/projeto/8/requisitos')
        cy.contains('button', 'Inserir Novo').click()

    });

    it('CT00 - Todos os Campos Válidos', () => {

        InserirRequisito(2, 'Requisito 1', 'Especificação 1')

    });

    it('CT00 - Equivalencia Inválida Número Identificador Número Negativo', () => {

        InserirRequisito(-1, 'Requisito 1', 'Especificação 1')

        cy.validator('O número inserido deve ser maior que 0.')

    });

    it('CT00 - Equivalência Inválida Número Indentificador Número Decimal', () => {

        //Falha
        InserirRequisito(1.1, 'Requisito 1', 'Especificação 1')

        cy.url().should('eq', 'http://localhost:4200/dashboard/projeto/8/inserir-requisito')
    });

    it('CT00 - Equivalência Inválida Número Identificador Número Zero', () => {

        InserirRequisito(0, 'Requisito 1', 'Especificacao 1')

        cy.validator('O número inserido deve ser maior que 0.')

    });

    it('CT00 - Equivalência Inválida Númerro Identificador Letra', () => {

        InserirRequisito('a', 'Requisito 1', 'Especificação 1')

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Número Identificador Número Caractere Especial', () => {

        InserirRequisito('@', 'Requisito 1', 'Especificação 1')

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Número Identificador Entrada Vazia', () => {

        cy.get('#name').type('Requisito 1')
        cy.get('#especificacao').type('Especificaçãp 1')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.');

    });

    it('CT00 - Equivalência Inválida Nome do Requisito Tamanho Menor', () => {

        InserirRequisito(16, 'R', 'Especificação 2')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Equivalência Inválida Nome do Requisito Tamanho Maior', () => {

        InserirRequisito(16, 'Requisitooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 'Especificação 1')

        cy.validator('Máximo de 100 caracteres.')

    });

    it('CT00 - Equivalência Inválida Nome do Requisito Entrada Vazia', () => {

        cy.get('#numeroIdentificador').type(11)
        cy.get('#especificacao').type('Especificação 1')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT00 - Equivalência Inválida Especificação do Requisito Tamanho Menor', () => {

        InserirRequisito(11, 'Requisito 2', 'E')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT00 - Equivalência Inválida Especificação do Requisito Tamanho Maior', () => {

        InserirRequisito(19, 'Requisito 2', 'Especificaçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

        cy.validator('Mínimo de 1000 caracteres.')

    });

    it('CT00 - EquivaLência Inválida Especificação do Requisito Nulo', () => {

        cy.get('#numeroIdentificador').type(17)
        cy.get('#name').type('Requisito 3')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });
    
});