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

    it('CT00 - Equivalência Válida Todos Campos Válidos', () => {

        InserirFatorAmbiental('Familiaridade com o processo unificado', 2)
        
    });

    it('CT00 - Equivalência Válida Campo Fator Ambiental Válido', () => {

        InserirFatorAmbiental('Experiência aplicação', 2)
        
    });

    it('CT00 - Equivalência Válida Campo Fator Ambiental Válido', () => {

        InserirFatorAmbiental('Experiência com orientação a objetos', 2)
        
    });

    it('CT00 - Equivalência Válida Campo Fator Ambiental Válido', () => {

        InserirFatorAmbiental('Capacidade de análise do líder de projeto', 2)
        
    });

    it('CT00 - Equivalência Válida Campo Fator Ambiental Válido', () => {

        InserirFatorAmbiental('Motivação', 2)
        
    });

    it('CT00 - Equivalência Válida Campo Fator Ambiental Válido', () => {

        InserirFatorAmbiental('Estabilidade dos requisitos', 2)
        
    });

    it('CT00 - Equivalência Válida Campo Fator Ambiental Válido', () => {

        InserirFatorAmbiental('Consultores em tempo parcial', 2)
        
    });

    it('CT00 - Equivalência Válida Campo Fator Ambiental Válido', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', 2)
        
    });

    it('CT00 - Equivalência Válida Campo Valor Maior Inválido', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', 6)
        
    });

    it('CT00 - Equivalência Válida Campo Valor Menor Inválido', () => {

        InserirFatorAmbiental('Dificuldade de programação na Linguagem', -1)
        
    });

    

});