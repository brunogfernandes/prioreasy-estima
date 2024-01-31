function InserirCasoDeUso(nome, complexidade, desc){

    cy.get('#nome').type(nome)
    cy.get('#complexidade').select(complexidade)
    cy.get('#descricao').type(desc)

    cy.contains('button', 'Concluir Cadastro').click()
}

describe('Teste de Particionamento de Equivalência - Inserir Requisito', () => {

    it('Testanto o caminho para chegar até Casos de Uso', () => {

        //Sucesso
        cy.login()
        cy.visit('http://localhost:4200/dashboard/projetos')
        cy.get(':nth-child(5) > .justify-center > :nth-child(1)').click()
        cy.contains('Requisitos Funcionais').click()
        cy.get('.border-b > .justify-center > :nth-child(1)').click()


    });
    // Otimizandoo o código para ir direto pro Dashboard de Casos de Uso, 
    // facilitando os testes de adição de colaborades

    beforeEach('Visitando Direto Dashboard os Casos de Uso', () => {

        cy.login()
        cy.wait(4000)
        cy.visit('http://localhost:4200/dashboard/projeto/8/requisitos/6/caso-de-uso')
        cy.contains('button', 'Inserir Novo').click()

    });

    it('CT00 - Nome do Caso de Uso Limite Inferior Menos Um', () => {

        InserirCasoDeUso('Nome', 'Simples', 'Complexo')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Nome do Caso de Uso Limite Inferior Igual', () => {

        InserirCasoDeUso('Nomee', 'Simples', 'Complexo')
        
    });

    it('CT00 - Nome do Caso de Uso Limite Inferior Mais Um', () => {

        InserirCasoDeUso('Nomeee', 'Simples', 'Complexo')
        
    });

    it('CT00 - Nome do Caso de Uso Limite Superior Menos Um', () => {

        InserirCasoDeUso('Nomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'Simples', 'Complexo')
        
    });

    it('CT00 - Nome do Caso de Uso Limite Superior Igual', () => {

        InserirCasoDeUso('Nomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'Simples', 'Complexo')
        
    });

    it('CT00 - Nome do Caso de Uso Limite Superior Mais Um', () => {

        InserirCasoDeUso('Nomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'Simples', 'Complexo')

        cy.validator('Máximo de 100 caracteres.')
        
    });

    it('CT00 - Descrição do Caso de Uso Limite Inferior Menos Um', () => {

        InserirCasoDeUso('Casos', 'Simples', 'Desc')

        cy.validator('Mínimo de 5 caracteres.')
        
    });

    it('CT00 - Descrição do Caso de Uso Limite Inferior Igual', () => {

        InserirCasoDeUso('Casos', 'Simples', 'Descr')
        
    });

    it('CT00 - Descrição do Caso de Uso Limite Inferior Mais Um', () => {

        InserirCasoDeUso('Casos', 'Simples', 'Descri')
        
    });

    it('CT00 - Descrição do Caso de Uso Limite Superior Menos Um', () => {

        InserirCasoDeUso('Casos', 'Simples', 'DescriDescriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
        
    });

    it('CT00 - Descrição do Caso de Uso Limite Superior Igual', () => {

        InserirCasoDeUso('Casos', 'Simples', 'DescriDescriçãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
        
    });

    it('CT00 - Descrição do Caso de Uso Limite Superior Mais Um', () => {

        InserirCasoDeUso('Casos', 'Simples', 'DescriDescriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

        cy.validator('Máximo de 255 caracteres.')
        
    });


    


    

});