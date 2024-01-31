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

    it('CT00 - Número identificador Limite Menos Um ', () => {
        
        InserirRequisito(0, 'Requisito', 'Especificação')

        cy.validator('O número inserido deve ser maior que 0.')

    });

    it('CT00 - Número identificador Limite Igual ', () => {
        
        InserirRequisito(1, 'Requisito', 'Especificação')

    });

    it('CT00 - Número identificador Limite Mais Um ', () => {
        
        InserirRequisito(2, 'Requisito', 'Especificação')

    });

    it('CT00 - Nome do Requisito Limite Inferior Menos Um', () => {

        InserirRequisito(1, 'Nome', 'Especificação')

        cy.validator('Mínimod de 5 caracteres.')
        
    });

    it('CT00 - Nome do Requisito Limite Inferior Igual', () => {

        InserirRequisito(1, 'Nomee', 'Especificação')
        
    });

    it('CT00 - Nome do Requisito Limite Inferior Menos Um', () => {

        InserirRequisito(1, 'Nomeee', 'Especificação')
        
    });

    it('CT00 - Nome do Requisito Limite Superior Menos Um', () => {

        InserirRequisito(1, 'Nomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'Especificação')
        
    });

    it('CT00 - Nome do Requisito Limite Superior Igual', () => {

        InserirRequisito(1, 'Nomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'Especificação')
        
    });

    it('CT00 - Nome do Requisito Limite Superior Mais Um', () => {

        InserirRequisito(1, 'Nomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'Especificação')

        cy.validator('Máximo de 100 caracteres.')
        
    });

    it('CT00 - Especificação do Requisito Limite Inferior Menos Um', () => {
        
        InserirRequisito(2, 'Requisito', 'Espe')

        cy.validator('Mínimo de 5 caracteres')

    });

    it('CT00 - Especificação do Requisito Limite Inferior Igual', () => {
        
        InserirRequisito(2, 'Requisito', 'Espec')

    });

    it('CT00 - Especificação do Requisito Limite Inferior Mais Um', () => {
        
        InserirRequisito(2, 'Requisito', 'Espece')

    });

    it('CT00 - Especificação do Requisito Limite Superior Menos Um', () => {
        
        InserirRequisito(2, 'Requisito', 'Especificaçãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

    });

    it('CT00 - Especificação do Requisito Limite Superior Igual', () => {
        
        InserirRequisito(2, 'Requisito', 'Especificaçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

    });

    it('CT00 - Especificação do Requisito Limite Superior Mais Um', () => {
        
        InserirRequisito(2, 'Requisito', 'Especificaçãooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')

        cy.validator('Máximo de 1000 caracteres.')

    });

});