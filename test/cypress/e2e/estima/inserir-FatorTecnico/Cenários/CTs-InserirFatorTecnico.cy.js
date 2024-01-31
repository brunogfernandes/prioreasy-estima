function InserirFatorTecnico(fator, valor) {

    cy.get('#fatTec').select(fator)
    cy.get('#valor').type(valor)

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
        cy.visit('http://localhost:4200/dashboard/projeto/8/fatores-tecnicos')
        cy.contains('button', 'Inserir Novo').click()

    });

    it('CT00 - Cadastro de Fator Técnico com Sucesso', () => {

        InserirFatorTecnico('Sistema distribuído', 2)
        
    });

    it('CT00 - Cadastro sem sucesso, valor incorreto', () => {

        InserirFatorTecnico('Sistema distribuído', -1)

        cy.validator('Mínimo de 0.')

    });

    it('CT00 - Campos sem preencher', () => {
        
        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

});