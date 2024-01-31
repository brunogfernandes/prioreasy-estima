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

    it('CT00 - Equivalênca Válida Todos Campos Válidos', () => {
        
        InserirFatorTecnico('Sistema distribuído', 2)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Sistema distribuído', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Desempenho da Aplicação', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Eficiência do Usuário', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Complexidade de Processamento', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Reusabilidade de Código', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Facilidade de instalação', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Facilidade de uso', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Portabilidade', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Facilidade de mudança', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Concorrência', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Características de segurança', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Acesso a Dispositivos de Terceiros', 3)

    });

    it('CT00 - Equivalência Válida Campo Válido', () => {
        
        InserirFatorTecnico('Requer Treinamento aos Usuários', 3)

    });


});
