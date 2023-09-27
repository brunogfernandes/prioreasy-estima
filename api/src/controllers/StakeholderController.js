import connection from '../database/databaseConnection.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const StakeholderController = {
    async create(req, res){
        try {
            console.log("");
            console.log("[INFO] Iniciando cadastro de usuário");

            const {nome, email, cargo, senha, confirmarSenha, projeto_id} = req.body;

            const chave = crypto.randomBytes(20).toString('hex');

            const isValid = validateUserFields(nome, chave, email, cargo, senha, confirmarSenha, res);

            if(!isValid){
                console.log("[INFO] Pesquisando usuário por email");

                const usuarioPorChave = await connection('STAKEHOLDERS').select('*').where('STA_CHAVE', chave);
                const projeto = await connection('PROJETOS').select('*').where('PRO_ID', projeto_id);

                const isRegistered = isUserRegistered(usuarioPorChave, res);
                const isProjectInvalid = isProjectUnregistered(projeto, res);

                if(!isRegistered && !isProjectInvalid) {
                    console.log("[INFO] Inserindo usuário no banco de dados");

                    const date = new Date();

                    const createdUser = await connection('USUARIOS').insert({
                        USU_DATA_CADASTRO: date
                    });

                    const usu_id = createdUser[0];

                    const encryptedPassword = await bcrypt.hash(senha, 10);

                    await connection('STAKEHOLDERS').insert({
                        STA_NOME: nome,
                        STA_CHAVE: chave,
                        STA_EMAIL: email,
                        STA_CARGO: cargo,
                        STA_SENHA: encryptedPassword,
                        FK_USUARIOS_USU_ID: usu_id,
                        FK_PROJETOS_PRO_ID: projeto_id
                    });

                    res.status(200).send({
                        message: "Criação de usuário realizado com sucesso!",
                    });
                }
            }
        } catch (err) {
            console.log("[ERROR] [StakeholderController] Erro no método create: " + err);
        }
    }, 
    
}

function validateUserFields(nome, chave, email, cargo, senha, confirmarSenha, res){
    try {
        console.log("[INFO] Validando dados do usuário");

        if (senha != confirmarSenha) {
            console.log("[WARN] As senhas inseridas devem coincidir.");

            return res.status(400).send({
                message: "As senhas inseridas devem coincidir.",
            });
        }

        const isValid = isUserFieldsValid(nome, chave, email, cargo, senha, confirmarSenha, res);

        if (!isValid) {
            console.log("[WARN] Dados de usuário preenchidos incorretamente! Todos os campos são obrigatórios e devem seguir o padrão.");

            return res.status(400).send({
                message: "Dados de usuário preenchidos incorretamente! Todos os campos são obrigatórios e devem seguir o padrão.",
            });
        }
    } catch (err) {
        console.log("[ERROR] [StakeholderController] Erro no método validateUserFields: " + err);
    }
}

function isUserFieldsValid(nome, chave, email, cargo, senha, confirmarSenha) {
    try {
        var numeros = /([0-9])/;
        var alfabeto = /([a-zA-Z])/;
        var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

        const isValidNome = nome.length >= 5 && nome.length <= 100;
        console.log("[INFO] Nome usuário é válido?" + isValidNome);

        const isValidChave = chave.length >= 5 && chave.length <= 50;
        console.log("[INFO] Chave é válido?" + isValidChave);

        const isValidEmail = email.length >= 5 && email.length <= 255 && email.includes("@");
        console.log("[INFO] Email é válido?" + isValidEmail);

        const isValidSenha = senha.length >= 5 && senha.length <= 25 && chEspeciais.test(senha) && alfabeto.test(senha) && numeros.test(senha);
        console.log("[INFO] Senha é válida?" + isValidSenha);

        const isValidConfirmarSenha = (senha == confirmarSenha) && isValidSenha;
        console.log("[INFO] Confirmar Senha é válido?" + isValidConfirmarSenha);

        const isValidCargo = cargo.length >= 3 && cargo.length <= 30;
        console.log("[INFO] Cargo é válido?" + isValidCargo);

        return isValidNome && isValidEmail && isValidChave && isValidCargo && isValidSenha && isValidConfirmarSenha;
    } catch {
        console.log("[ERROR] [StakeholderController] Erro no método isUserFieldsValid: " + err);
    }
}

function isUserRegistered(usuarioPorChave, res){
    try {
        console.log("[INFO] Verificando se usuário está cadastrado no sistema");

        if (usuarioPorChave.length) {
            console.log("[WARN] Chave já cadastrada.");

            return res.status(400).send({
                message: "Chave já cadastrada.",
            });
        }
    } catch (err) {
        console.log("[ERROR] [StakeholderController] Erro no método isUserRegistered: " + err);
    }
}

function isProjectUnregistered(projeto, res){
    try {
        console.log("[INFO] Verificando se o projeto está cadastrado no sistema");

        if (!projeto.length) {
            console.log("[WARN] Projeto não encontrado.");

            return res.status(400).send({
                message: "Projeto não encontrado.",
            });
        }
    } catch (err) {
        console.log("[ERROR] [StakeholderController] Erro no método isUserRegistered: " + err);
    }
}