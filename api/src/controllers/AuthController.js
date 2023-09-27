import connection from "../database/databaseConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";

export const AuthController = {
  async signup(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de usuário");

      const { nome, email, empresa, cargo, senha, confirmarSenha } = req.body;

      const isValid = validateUserFields(
        nome,
        email,
        empresa,
        cargo,
        senha,
        confirmarSenha,
        res
      );

      if (!isValid) {
        console.log("[INFO] Pesquisando usuário por email");

        const usuarioPorEmail = await connection("COLABORADORES")
          .select("*")
          .where("COL_EMAIL", email);

        const isRegistered = isUserRegistered(usuarioPorEmail, res);

        if (!isRegistered) {
          console.log("[INFO] Inserindo usuário no banco de dados");

          const date = new Date();

          const createdUser = await connection("USUARIOS").insert({
            USU_DATA_CADASTRO: date,
          });

          const usu_id = createdUser[0];

          const encryptedPassword = await bcrypt.hash(senha, 10);

          await connection("COLABORADORES").insert({
            COL_NOME: nome,
            COL_EMAIL: email,
            COL_SENHA: encryptedPassword,
            COL_EMPRESA: empresa,
            COL_CARGO: cargo,
            FK_USUARIOS_USU_ID: usu_id,
          });

          res.status(200).send({
            message: "Criação de usuário realizado com sucesso!",
          });
        }
      }
    } catch (err) {
      console.log("[ERROR] [AuthController] Erro no método signup: " + err);
    }
  },

  async signinColaborador(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando login do colaborador.");

      const { email, senha } = req.body;

      const user = await connection("COLABORADORES")
        .select("*")
        .where({ COL_EMAIL: email });

      if (!user.length) {
        return res.status(401).send({
          message: "O Colaborador não foi encontrado na base de dados!",
        });
      }

      const isPasswordValid = bcrypt.compareSync(senha, user[0].COL_SENHA);

      if (!isPasswordValid) {
        return res.status(401).send({
          message: "Senha incorreta!",
        });
      } else {
        const token = jwt.sign(
          { usu_id: user.FK_USUARIOS_USU_ID, usu_email: user.COL_EMAIL },
          config.secret,
          {
            expiresIn: 86400,
          }
        );

        res.status(200).send({
          message: "Colaborador logado com sucesso!",
          usu_id: user[0].COL_ID,
          usu_email: user[0].COL_EMAIL,
          accessToken: token,
        });
      }
    } catch (err) {
      console.log(
        "[ERROR] [AuthController] Erro no método signinColaborador: " + err
      );
    }
  },

  async signinStakeholder(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando login do stakeholder.");

      const { chave, senha } = req.body;

      const user = await connection("STAKEHOLDERS")
        .select("*")
        .where({ STA_CHAVE: chave });

      if (!user.length) {
        return res.status(401).send({
          message: "O Stakeholder não foi encontrado na base de dados!",
        });
      }

      const isPasswordValid = bcrypt.compareSync(senha, user[0].STA_SENHA);

      if (!isPasswordValid) {
        return res.status(401).send({
          message: "Senha incorreta!",
        });
      } else {
        const token = jwt.sign(
          { usu_id: user.FK_USUARIOS_USU_ID, usu_email: user.STA_EMAIL },
          config.secret,
          {
            expiresIn: 86400,
          }
        );

        res.status(200).send({
          message: "Colaborador logado com sucesso!",
          usu_id: user[0].STA_ID,
          usu_email: user[0].STA_EMAIL,
          accessToken: token,
        });
      }
    } catch (err) {
      console.log(
        "[ERROR] [AuthController] Erro no método signinColaborador: " + err
      );
    }
  },

  async verifyLogin(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res
          .status(401)
          .send({ auth: false, message: "Token não informado." });
      }

      jwt.verify(token, config.secret, function (err) {
        if (err) {
          return res
            .status(401)
            .send({ auth: false, message: "Token inválido." });
        } else {
          return res.status(200).send({ auth: true, message: "Token válido." });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};

function validateUserFields(
  nome,
  email,
  empresa,
  cargo,
  senha,
  confirmarSenha,
  res
) {
  try {
    console.log("[INFO] Validando dados do usuário");

    if (senha != confirmarSenha) {
      console.log("[WARN] As senhas inseridas devem coincidir.");

      return res.status(400).send({
        message: "As senhas inseridas devem coincidir.",
      });
    }

    const isValid = isUserFieldsValid(
      nome,
      email,
      empresa,
      cargo,
      senha,
      confirmarSenha
    );

    if (!isValid) {
      console.log(
        "[WARN] Dados de usuário preenchidos incorretamente! Todos os campos são obrigatórios e devem seguir o padrão."
      );

      return res.status(400).send({
        message:
          "Dados de usuário preenchidos incorretamente! Todos os campos são obrigatórios e devem seguir o padrão.",
      });
    }
  } catch (err) {
    console.log(
      "[ERROR] [AuthController] Erro no método validateUserFields: " + err
    );
  }
}

function isUserFieldsValid(nome, email, empresa, cargo, senha, confirmarSenha) {
  try {
    var numeros = /([0-9])/;
    var alfabeto = /([a-zA-Z])/;
    var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    const isValidNome = nome.length >= 5 && nome.length <= 100;
    console.log("[INFO] Nome usuário é válido?" + isValidNome);

    const isValidEmail =
      email.length >= 5 && email.length <= 255 && email.includes("@");
    console.log("[INFO] Email é válido?" + isValidEmail);

    const isValidSenha =
      senha.length >= 5 &&
      senha.length <= 25 &&
      chEspeciais.test(senha) &&
      alfabeto.test(senha) &&
      numeros.test(senha);
    console.log("[INFO] Senha é válida?" + isValidSenha);

    const isValidConfirmarSenha = senha == confirmarSenha && isValidSenha;
    console.log("[INFO] Confirmar Senha é válido?" + isValidConfirmarSenha);

    const isValidEmpresa = empresa.length >= 5 && empresa.length <= 30;
    console.log("[INFO] Empresa é válido?" + isValidEmpresa);

    const isValidCargo = cargo.length >= 3 && cargo.length <= 30;
    console.log("[INFO] Cargo é válido?" + isValidCargo);

    return (
      isValidNome &&
      isValidEmail &&
      isValidEmpresa &&
      isValidCargo &&
      isValidSenha &&
      isValidConfirmarSenha
    );
  } catch {
    console.log(
      "[ERROR] [AuthController] Erro no método isUserFieldsValid: " + err
    );
  }
}

function isUserRegistered(usuarioPorEmail, res) {
  try {
    console.log("[INFO] Verificando se usuário está cadastrado no sistema");

    if (usuarioPorEmail.length) {
      console.log("[WARN] Email já cadastrado.");

      return res.status(400).send({
        message: "Email já cadastrado.",
      });
    }
  } catch (err) {
    console.log(
      "[ERROR] [AuthController] Erro no método isUserRegistered: " + err
    );
  }
}
