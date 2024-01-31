function InserirFatorTecnico(fator, valor) {

    cy.get('#fatTec').select(fator)
    cy.get('#valor').type(valor)

    cy.contains('button', 'Concluir Cadastro').click()
}


describe('Teste de Cenários - Inserir Ator', () => {
    it('Visitando o dashboard dos Fatores Técnicos', () => {

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

    it('CT00 - Fator Técnico Valor Limite Inferior Menos Um', () => {

        InserirFatorTecnico('Sistema distribuído', -1)

        cy.validator('Mínimo de 0.')
        
    });

    it('CT00 - Fator Técnico Valor Limite Inferior Igual', () => {

        InserirFatorTecnico('Sistema distribuído', 0)
        
    });

    it('CT00 - Fator Técnico Valor Limite Inferior Mais Um', () => {

        InserirFatorTecnico('Sistema distribuído', 1)
        
    });

    it('CT00 - Fator Técnico Valor Limite Superior Menos Um', () => {

        InserirFatorTecnico('Sistema distribuído', 4)
        
    });

    it('CT00 - Fator Técnico Valor Limite Superior Igual', () => {

        InserirFatorTecnico('Sistema distribuído', 5)
        
    });

    it('CT00 - Fator Técnico Valor Limite Superior Mais Um', () => {

        InserirFatorTecnico('Sistema distribuído', 6)

        cy.validator('Máximo de 5.')
        
    });

    

});
