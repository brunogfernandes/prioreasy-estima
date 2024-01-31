function Cadastro(nome, email, empresa, cargo, senha, csenha) {

    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#company').type(empresa)
    cy.get('#role').select(cargo)
    cy.get('#password').type(senha)
    cy.get('#confirm_password').type(csenha)

    cy.contains('button', 'Concluir Cadastro').click()

}

describe('Teste de Particionamento de Equivalência - Cadastro', () => {

    beforeEach('Visitanto página', () => {

        cy.visit("http://localhost:4200/signup");

    });
    it('CT05 - Todos os campos válidos', () => {

        Cadastro('Jack Frost Sexto', 'jackfrost6@gmail.com', 'Frost Jack LTDA', 'Desenvolvedor', 'jackw123@', 'jackw123@')

    });

    it('CT06 - Equvialência Invalida Nome Tamanho Menor', () => {

        Cadastro('Jack', 'jackfrost9@gmail.com', 'Frost', 'Desenvolvedor', 'jack2123@', 'jack2123@')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT07 - Equivalência Inválida Nome Tamanho Maior', () => {

        Cadastro('Jackkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
            'frostjack@gmail.com', 'Frost Enterprise', 'Desenvolvedor', 'jack1235@', 'jack1235@'
        )

        cy.validator('Máximo de 100 caracteres.')
    });

    it('CT08 - Equivalência Inválida Nome Nulo', () => {

        cy.get('#email').type('frostjack2@gmail.com')
        cy.get('#company').type('Frost Enterprise LTDA')
        cy.get('#role').select('Desenvolvedor')
        cy.get('#password').type('jack1236@')
        cy.get('#confirm_password').type('jack1236@')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')
    });

    it('CT09 - Equivalência Inválida Email Tamanho Menor', () => {

        Cadastro('Jackk', 'x@x.', 'Frost Enterprise', 'Desenvolvedor', 'jack1238@', 'jack1238@')

        cy.validator('Mínimo de 5 caracteres.')

    });

    it('CT10 - Equivalência Inválida Email Tamanho Maior', () => {

        Cadastro('Jacck', 'jackkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk@gmail.com',
            'Frost Enterprise', 'Desenvolvedor', 'jack1235@', 'jack1235@'
        )

        cy.validator('Máximo de 255 caracteres.')

    });

    it('CT11 - Equivalência Inválida Email Sem Caractere Especial', () => {

        Cadastro('Frost', 'jackfrost0gmail.com', 'Frost Enterprise', 'Desenvolvedor', 'jack1235@', 'jack1235@')

    });

    it('CT12 - Equivalência Inválida Email Fora do Formato', () => {

        Cadastro('Jacckizin', 'jackfrost123@', 'Frost Enterprise', 'Desenvolvedor', 'jack1235@', 'jack1235@')



    });

    it('CT13 - Equivalência Inválida Empresa Tamanho Menor', () => {

        Cadastro('Jacck', 'jackkkkkkk@gmail.com', 'Empr', 'Desenvolvedor', 'jack1235@', 'jack1235@')

    });

    it('CT14 - Equivalência Inválida Empresa Tamanho Maior', () => {

        Cadastro('Jacck', 'jackkkk@gmail.com', 'Empresaaaaaaaaaaaaaaaaaaaaaaaaa', 'Desenvolvedor', 'jack1235@', 'jack1235@')

    });

    it('CT15 - Equivalência Inválida Empresa Nulo', () => {

        cy.get('#name').type('Jackke')
        cy.get('#email').type('jackke@gmail.com')
        cy.get('#role').select('Desenvolvedor')
        cy.get('#password').type('jack1235@')
        cy.get('#confirm_password').type('jack1235@')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT16 - Equivalência Inválida Cargo Nulo', () => {

        cy.get('#name').type('Jacck')
        cy.get('#email').type('jackkok@gmail.com')
        cy.get('#company').type('Empresaa')
        cy.get('#password').type('jack1235@')
        cy.get('#confirm_password').type('jack1235@')

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')
    });

    it('CT17 - Equivalência Inválida Senha Tamanho Menor', () => {

        Cadastro('jacckad', 'jacku@gmail.com', 'Empresaaa', 'Desenvolvedor', 'ja1@', 'ja1@')

        cy.validator('Mínimo de 5 caracteres.')


    });

    it('CT18 - Equivalência Inválida Senha Tamanho Maior', () => {

        Cadastro('Jacckad', 'jacku@gmail.com', 'Empresaaa', 'Desenvolvedor', 'jackkkkkkkkkkkkkkkkkkkkkkkkkk1@', 'jackkkkkkkkkkkkkkkkkkkkkkkkkk1@')

        cy.validator('Máximo de 25 caracteres.')

    });

    it('CT19 - Equivalência Inválida Senha Nulo', () => {

        cy.get('#name').type('Jacckad')
        cy.get('#email').type('jacku@gmail.com')
        cy.get('#company').type('Empresaa')
        cy.get('#role').select('Desenvolvedor')
        

        cy.contains('button', 'Concluir Cadastro').click()

        cy.validator('Campo obrigatório.')

    });

    it('CT20 - Equivalência Inválida ', () => {
        
    });

    it('CT21 - Equivalência Inválida ', () => {
        
    });
    it('CT22 - Equivalência Inválida ', () => {
        
    });

    
});