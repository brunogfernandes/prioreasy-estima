function InserirFatorAmbiental(fator, valor) {

    cy.get('#fatTec').select(fator)
    cy.get('#valor').type(valor)

    cy.contains('button', 'Concluir Cadastro').click()
}


describe('Teste de Cenários - Inserir Ator', () => {
    
    beforeEach('Visitando direto o dasboard atores', () => {

        cy.login()
        cy.visit('http://localhost:4200/dashboard/projeto/8/fatores-ambientais')
        cy.contains('button', 'Inserir Novo').click()

    });
    
    it('CT00 - Cadastro Fator Ambiental com Sucesso', () => {

        InserirFatorAmbiental('Familiaridade com o processo unificado', 3)
        
    });

    it('CT00 - Cadastro Fator Ambiental sem sucesso, campo preenchido incorretamente', () => {

        InserirFatorAmbiental('Familiaridade com o processo unificado', 8)

        cy.validator('Máximo de 5.')
 
   });

   it('CT00 - Campos sem preencher', () => {

        cy.contains('button', 'Concluir Cadastro').click()
    
        cy.validator('Campo obrigatório.')

   });

});