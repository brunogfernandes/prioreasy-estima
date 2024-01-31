function InserirFatorAmbiental(fator, valor) {

    cy.get('#fatTec').select(fator)
    cy.get('#valor').type(valor)

    cy.contains('button', 'Concluir Cadastro').click()
}


describe('Teste de Cenários - Inserir Ator', () => {
    
    beforeEach('Visitando direto o dasboard Fatores Ambientais', () => {

        cy.login()
        cy.visit('http://localhost:4200/dashboard/projeto/8/fatores-ambientais')
        cy.contains('button', 'Inserir Novo').click()

    });

    it('CT00 - Valor Limite Inferior Menos Um', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', -1)

        cy.validator('Mínimo de 0.')
        
    });

    it('CT00 - Valor Limite Inferior Igual', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', 0)
        
    });

    it('CT00 - Valor Limite Inferior Mais Um', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', 1)
        
    });

    it('CT00 - Valor Limite Superior Menos Um', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', 4)
        
    });

    it('CT00 - Valor Limite Inferior Igual', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', 5)
        
    });

    it('CT00 - Valor Limite Inferior Mais Um', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', 6)

        cy.validator('Máximo de 5.')
        
    });

});