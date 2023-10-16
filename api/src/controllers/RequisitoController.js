import connection from "../database/databaseConnection.js";

export const RequisitoController = {
  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de Requisito Funcional");

      const { nome, especificacao, numeroIdentificador } = req.body;

      const pro_id = req.query.projeto;

      console.log(
        "[INFO] Iniciando inserção do requisito funcional no banco de dados"
      );

      if (
        !validateRequirementFields(
          nome,
          especificacao,
          numeroIdentificador,
          res
        )
      ) {
        await connection("REQUISITOS_FUNCIONAIS").insert({
          REQ_NOME: nome,
          REQ_ESPECIFICACAO: especificacao,
          REQ_NUMERO_IDENTIFICADOR: numeroIdentificador,
          FK_PROJETOS_PRO_ID: pro_id,
        });

        console.log("[INFO] Requisito funcional cadastrado com sucesso");

        return res.status(201).send();
      }
    } catch (err) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método create: " + err
      );
    }
  },

  async update(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de Requisito Funcional");

      const { nome, especificacao, numeroIdentificador } = req.body;

      const pro_id = req.query.projeto;
      const req_id = req.query.requisito;

      console.log(
        "[INFO] Iniciando atualização do requisito funcional no banco de dados"
      );

      if (
        !validateRequirementFields(
          nome,
          especificacao,
          numeroIdentificador,
          res
        )
      ) {
        await connection("REQUISITOS_FUNCIONAIS")
          .where({ REQ_ID: req_id })
          .update({
            REQ_NOME: nome,
            REQ_ESPECIFICACAO: especificacao,
            REQ_NUMERO_IDENTIFICADOR: numeroIdentificador,
            FK_PROJETOS_PRO_ID: pro_id,
          });

        console.log("[INFO] Requisito funcional atualizado com sucesso");

        return res.status(200).send();
      }
    } catch (err) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método update: " + err
      );
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando exclusão de Requisito Funcional");

      const req_id = req.query.requisito;

      console.log(
        "[INFO] Iniciando exclusão do requisito funcional no banco de dados"
      );

      await connection("REQUISITOS_FUNCIONAIS").where({ REQ_ID: req_id }).del();

      console.log("[INFO] Requisito funcional excluído com sucesso");

      return res.status(200).send();
    } catch (err) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método delete: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de Requisito Funcional por ID");

      const req_id = req.query.id;

      console.log(
        "[INFO] Iniciando busca do requisito funcional no banco de dados"
      );

      const requisito = await connection("REQUISITOS_FUNCIONAIS")
        .select("*")
        .where("REQ_ID", req_id)
        .first();

      console.log("[INFO] Requisito funcional encontrado com sucesso");

      return res.json({
        id: requisito.REQ_ID,
        nome: requisito.REQ_NOME,
        especificacao: requisito.REQ_ESPECIFICACAO,
        numeroIdentificador: requisito.REQ_NUMERO_IDENTIFICADOR,
      });
    } catch (err) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método getById: " + err
      );
    }
  },

  async list(req, res) {
    try {
      console.log("");
      console.log(
        "[INFO] Iniciando listagem de Requisitos Funcionais do Projeto"
      );
      const pro_id = req.query.projeto;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const requisitos = await connection("REQUISITOS_FUNCIONAIS")
        .select("*")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = requisitos.map((requisito) => {
        return {
          id: requisito.REQ_ID,
          nome: requisito.REQ_NOME,
          especificacao: requisito.REQ_ESPECIFICACAO,
          numeroIdentificador: requisito.REQ_NUMERO_IDENTIFICADOR,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("REQUISITOS_FUNCIONAIS")
        .where("FK_PROJETOS_PRO_ID", pro_id)
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
    } catch (error) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método list: " + error
      );
    }
  },

  async listByNamePaginated(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de Requisitos Funcionais");
      const pro_id = req.query.projeto;
      const nome = req.query.nome;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const requisitos = await connection("REQUISITOS_FUNCIONAIS")
        .select("*")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("REQ_NOME", `%${nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = requisitos.map((requisito) => {
        return {
          id: requisito.REQ_ID,
          nome: requisito.REQ_NOME,
          especificacao: requisito.REQ_ESPECIFICACAO,
          numeroIdentificador: requisito.REQ_NUMERO_IDENTIFICADOR,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("REQUISITOS_FUNCIONAIS")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("REQ_NOME", `%${nome}%`)
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
    } catch (error) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método listByNamePaginated: " +
          error
      );
    }
  },

  async listResultados(req, res) {
    try {
      console.log("");
      console.log(
        "[INFO] Iniciando listagem de Requisitos Funcionais & Resultados do Projeto"
      );
      const pro_id = req.query.projeto;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const requisitos = await connection("REQUISITOS_FUNCIONAIS")
        .select("*")
        .leftJoin(
          "RESULTADOS_REQUISITOS",
          "REQUISITOS_FUNCIONAIS.REQ_ID",
          "=",
          "RESULTADOS_REQUISITOS.FK_REQUISITOS_FUNCIONAIS_REQ_ID"
        )
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = requisitos.map((requisito) => {
        return {
          id: requisito.REQ_ID,
          nome: requisito.REQ_NOME,
          especificacao: requisito.REQ_ESPECIFICACAO,
          numeroIdentificador: requisito.REQ_NUMERO_IDENTIFICADOR,
          resultadoFinal: requisito.RPR_RESULTADO_FINAL,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("REQUISITOS_FUNCIONAIS")
        .where("FK_PROJETOS_PRO_ID", pro_id)
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
    } catch (error) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método list: " + error
      );
    }
  },

  async listResultadosByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de Requisitos Funcionais");
      const pro_id = req.query.projeto;
      const nome = req.query.nome;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const requisitos = await connection("REQUISITOS_FUNCIONAIS")
        .select("*")
        .leftJoin(
          "RESULTADOS_REQUISITOS",
          "REQUISITOS_FUNCIONAIS.REQ_ID",
          "=",
          "RESULTADOS_REQUISITOS.FK_REQUISITOS_FUNCIONAIS_REQ_ID"
        )
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("REQ_NOME", `%${nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = requisitos.map((requisito) => {
        return {
          id: requisito.REQ_ID,
          nome: requisito.REQ_NOME,
          especificacao: requisito.REQ_ESPECIFICACAO,
          numeroIdentificador: requisito.REQ_NUMERO_IDENTIFICADOR,
          resultadoFinal: requisito.RPR_RESULTADO_FINAL,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("REQUISITOS_FUNCIONAIS")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("REQ_NOME", `%${nome}%`)
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
    } catch (error) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método listByNamePaginated: " +
          error
      );
    }
  },

  async listPriorizacaoStakeholders(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de Requisitos Funcionais do Stakeholder");
      const pro_id = req.query.projeto;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const requisitos = await connection("REQUISITOS_FUNCIONAIS")
        .select("*")
        .leftJoin(
          "PRIORIZACAO_STAKEHOLDERS",
          "REQUISITOS_FUNCIONAIS.REQ_ID",
          "=",
          "PRIORIZACAO_STAKEHOLDERS.FK_REQUISITOS_FUNCIONAIS_REQ_ID"
        )
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = requisitos.map((requisito) => {
        return {
          id: requisito.REQ_ID,
          nome: requisito.REQ_NOME,
          especificacao: requisito.REQ_ESPECIFICACAO,
          numeroIdentificador: requisito.REQ_NUMERO_IDENTIFICADOR,
          respostaPositiva: requisito.PRS_RESPOSTA_POSITIVA,
          respostaNegativa: requisito.PRS_RESPOSTA_NEGATIVA,
          classificacaoRequisito: requisito.PRS_CLASSIFICACAO_REQUISITO,
        };
      });

      const totalCountQuery = await connection("REQUISITOS_FUNCIONAIS")
        .count("* as totalCount")
        .where("FK_PROJETOS_PRO_ID", pro_id)
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
    } catch (error) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método listPriorizacaoStakeholders: " + error
      );
    }
  },

  async listPriorizacaoStakeholdersByNome(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de Requisitos Funcionais do Stakeholder por nome");
      const pro_id = req.query.projeto;
      const nome = req.query.nome;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const requisitos = await connection("REQUISITOS_FUNCIONAIS")
        .select("*")
        .leftJoin(
          "PRIORIZACAO_STAKEHOLDERS",
          "REQUISITOS_FUNCIONAIS.REQ_ID",
          "=",
          "PRIORIZACAO_STAKEHOLDERS.FK_REQUISITOS_FUNCIONAIS_REQ_ID"
        )
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("REQ_NOME", `%${nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = requisitos.map((requisito) => {
        return {
          id: requisito.REQ_ID,
          nome: requisito.REQ_NOME,
          especificacao: requisito.REQ_ESPECIFICACAO,
          numeroIdentificador: requisito.REQ_NUMERO_IDENTIFICADOR,
          respostaPositiva: requisito.PRS_RESPOSTA_POSITIVA,
          respostaNegativa: requisito.PRS_RESPOSTA_NEGATIVA,
          classificacaoRequisito: requisito.PRS_CLASSIFICACAO_REQUISITO,
        };
      });

      const totalCountQuery = await connection("REQUISITOS_FUNCIONAIS")
        .count("* as totalCount")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("REQ_NOME", `%${nome}%`)
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
    } catch (error) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método listPriorizacaoStakeholdersByNome: " + error
      );
    }
  }
};

function validateRequirementFields(
  nome,
  especificacao,
  numeroIdentificador,
  res
) {
  console.log("[INFO] Verificando campos do requisito funcional");

  if (!nome || !especificacao || !numeroIdentificador) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não informados" });
  }

  const isValidNome = nome.length >= 5 && nome.length <= 100;
  const isValidEspecificacao =
    especificacao.length >= 5 && especificacao.length <= 1000;
  const isValidNumeroIdentificador = numeroIdentificador > 0;

  if (!isValidNome) {
    return res.status(400).json({ error: "Nome inválido" });
  }

  if (!isValidEspecificacao) {
    return res.status(400).json({ error: "Especificação inválida" });
  }

  if (!isValidNumeroIdentificador) {
    return res.status(400).json({ error: "Número identificador inválido" });
  }
}
