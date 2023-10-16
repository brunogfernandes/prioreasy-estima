import connection from "../database/databaseConnection.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const StakeholderController = {
  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de usuário");

      const { nome, email, cargo, senha, confirmarSenha, projeto_id } =
        req.body;

      const chave = crypto.randomBytes(20).toString("hex");

      const isValid = validateUserFields(
        nome,
        chave,
        email,
        cargo,
        senha,
        confirmarSenha,
        res
      );

      if (!isValid) {
        console.log("[INFO] Pesquisando usuário por email");

        const usuarioPorChave = await connection("STAKEHOLDERS")
          .select("*")
          .where("STA_CHAVE", chave);
        const projeto = await connection("PROJETOS")
          .select("*")
          .where("PRO_ID", projeto_id);

        const isRegistered = isUserRegistered(usuarioPorChave, res);
        const isProjectInvalid = isProjectUnregistered(projeto, res);

        if (!isRegistered && !isProjectInvalid) {
          console.log("[INFO] Inserindo usuário no banco de dados");

          const date = new Date();

          const createdUser = await connection("USUARIOS").insert({
            USU_DATA_CADASTRO: date,
          });

          const usu_id = createdUser[0];

          const encryptedPassword = await bcrypt.hash(senha, 10);

          const createdStakeholder = await connection("STAKEHOLDERS").insert({
            STA_NOME: nome,
            STA_CHAVE: chave,
            STA_EMAIL: email,
            STA_CARGO: cargo,
            STA_SENHA: encryptedPassword,
            FK_USUARIOS_USU_ID: usu_id,
            FK_PROJETOS_PRO_ID: projeto_id,
          });

          const sta_id = createdStakeholder[0];

          await connection("STATUS_PRIORIZACAO").insert({
            FK_STAKEHOLDERS_STA_ID: sta_id,
            SPA_PARTICIPACAO_REALIZADA: 0,
            SPA_ALERTA_EMITIDO: 0,
          });

          res.status(200).send({
            message: "Criação de stakeholder realizada com sucesso!",
          });
        }
      }
    } catch (err) {
      console.log(
        "[ERROR] [StakeholderController] Erro no método create: " + err
      );
    }
  },

  async listByProjeto(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de usuários por projeto");

      const projeto_id = req.query.projeto;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const stakeholders = await connection("STAKEHOLDERS")
        .select("*")
        .join(
          "STATUS_PRIORIZACAO",
          "STAKEHOLDERS.STA_ID",
          "=",
          "STATUS_PRIORIZACAO.FK_STAKEHOLDERS_STA_ID"
        )
        .where("STAKEHOLDERS.FK_PROJETOS_PRO_ID", projeto_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = stakeholders.map((stakeholder) => {
        return {
          id: stakeholder.STA_ID,
          nome: stakeholder.STA_NOME,
          email: stakeholder.STA_EMAIL,
          cargo: stakeholder.STA_CARGO,
          chave: stakeholder.STA_CHAVE,
          alertaEmitido: stakeholder.SPA_ALERTA_EMITIDO === 1 ? "Sim" : "Não",
          participacaoRealizada:
            stakeholder.SPA_PARTICIPACAO_REALIZADA === 1 ? "Sim" : "Não",
        };
      });

      const totalCountQuery = await connection("STAKEHOLDERS")
        .where("STAKEHOLDERS.FK_PROJETOS_PRO_ID", projeto_id)
        .count("* as totalCount")
        .first();

      const { totalCount } = await totalCountQuery;

      // CALCULANDO TOTAL DE PÁGINAS
      const totalPages = Math.ceil(totalCount / pageSize);

      return res.json({
        items: serializedItems,
        page: {
          size: pageSize,
          totalElements: totalCount,
          totalPages: totalPages,
          number: page,
        },
      });
    } catch (err) {
      console.log(
        "[ERROR] [StakeholderController] Erro no método listByProjeto: " + err
      );
    }
  },

  async listByProjetoAndName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de usuários por projeto e nome");

      const projeto_id = req.query.projeto;
      const nome = req.query.nome;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const stakeholders = await connection("STAKEHOLDERS")
        .select("*")
        .join(
          "STATUS_PRIORIZACAO",
          "STAKEHOLDERS.STA_ID",
          "=",
          "STATUS_PRIORIZACAO.FK_STAKEHOLDERS_STA_ID"
        )
        .where("STAKEHOLDERS.FK_PROJETOS_PRO_ID", projeto_id)
        .andWhere("STAKEHOLDERS.STA_NOME", "like", `%${nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = stakeholders.map((stakeholder) => {
        return {
          id: stakeholder.STA_ID,
          nome: stakeholder.STA_NOME,
          email: stakeholder.STA_EMAIL,
          cargo: stakeholder.STA_CARGO,
          chave: stakeholder.STA_CHAVE,
          alertaEmitido: stakeholder.SPA_ALERTA_EMITIDO === 1 ? "Sim" : "Não",
          participacaoRealizada:
            stakeholder.SPA_PARTICIPACAO_REALIZADA === 1 ? "Sim" : "Não",
        };
      });

      const totalCountQuery = await connection("STAKEHOLDERS")
        .count("* as totalCount")
        .where("STAKEHOLDERS.FK_PROJETOS_PRO_ID", projeto_id)
        .andWhere("STAKEHOLDERS.STA_NOME", "like", `%${nome}%`)
        .first();

      const { totalCount } = await totalCountQuery;

      // CALCULANDO TOTAL DE PÁGINAS
      const totalPages = Math.ceil(totalCount / pageSize);

      return res.json({
        items: serializedItems,
        page: {
          size: pageSize,
          totalElements: totalCount,
          totalPages: totalPages,
          number: page,
        },
      });
    } catch (err) {
      console.log(
        "[ERROR] [StakeholderController] Erro no método listByProjetoAndName: " +
          err
      );
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando remoção de usuário");

      const id = req.query.id;

      await connection("STAKEHOLDERS").where("STA_ID", id).delete();

      res.status(200).send({
        message: "Usuário removido com sucesso!",
      });
    } catch (err) {
      console.log(
        "[ERROR] [StakeholderController] Erro no método delete: " + err
      );
    }
  },

  async alertStakeholder(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando alerta de stakeholder");

      const id = req.query.id;

      await connection("STATUS_PRIORIZACAO")
        .where("FK_STAKEHOLDERS_STA_ID", id)
        .update({
          SPA_ALERTA_EMITIDO: 1,
        });

      res.status(200).send({
        message: "Alerta de stakeholder emitido com sucesso!",
      });
    } catch (err) {
      console.log(
        "[ERROR] [StakeholderController] Erro no método alertStakeholder: " +
          err
      );
    }
  },

  async verifyAllStakeholdersParticipation(req, res) {
    try {
      console.log("");
      console.log("[INFO] Verificando participação de todos os stakeholders");

      const projetoId = req.query.projetoId;

      const notParticipatedStakeholders = await connection("STATUS_PRIORIZACAO")
        .select("FK_STAKEHOLDERS_STA_ID")
        .where("FK_PROJETOS_PRO_ID", projetoId)
        .andWhere("SPA_PARTICIPACAO_REALIZADA", 0);

      if (notParticipatedStakeholders.length > 0) {
        console.log(
          "[WARN] Nem todos os stakeholders participaram da priorização."
        );

        return res.status(400).send({
          message: "Nem todos os stakeholders participaram da priorização.",
        });
      }

      res.status(200).send({
        message: "Todos os stakeholders participaram da priorização.",
      });
    } catch (err) {
      console.log(
        "[ERROR] [StakeholderController] Erro no método verifyAllStakeholdersParticipation: " +
          err
      );
    }
  },
};

function validateUserFields(
  nome,
  chave,
  email,
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
      chave,
      email,
      cargo,
      senha,
      confirmarSenha,
      res
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
      "[ERROR] [StakeholderController] Erro no método validateUserFields: " +
        err
    );
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

    const isValidCargo = cargo.length >= 3 && cargo.length <= 30;
    console.log("[INFO] Cargo é válido?" + isValidCargo);

    return (
      isValidNome &&
      isValidEmail &&
      isValidChave &&
      isValidCargo &&
      isValidSenha &&
      isValidConfirmarSenha
    );
  } catch {
    console.log(
      "[ERROR] [StakeholderController] Erro no método isUserFieldsValid: " + err
    );
  }
}

function isUserRegistered(usuarioPorChave, res) {
  try {
    console.log("[INFO] Verificando se usuário está cadastrado no sistema");

    if (usuarioPorChave.length) {
      console.log("[WARN] Chave já cadastrada.");

      return res.status(400).send({
        message: "Chave já cadastrada.",
      });
    }
  } catch (err) {
    console.log(
      "[ERROR] [StakeholderController] Erro no método isUserRegistered: " + err
    );
  }
}

function isProjectUnregistered(projeto, res) {
  try {
    console.log("[INFO] Verificando se o projeto está cadastrado no sistema");

    if (!projeto.length) {
      console.log("[WARN] Projeto não encontrado.");

      return res.status(400).send({
        message: "Projeto não encontrado.",
      });
    }
  } catch (err) {
    console.log(
      "[ERROR] [StakeholderController] Erro no método isUserRegistered: " + err
    );
  }
}
