import connection from "../database/databaseConnection.js";

export const CasoUsoController = {
  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de Caso de uso");

      const { nome, complexidade, descricao } = req.body;

      const req_id = req.query.requisito;

      console.log(
        "[INFO] Iniciando inserção do Caso de Uso no banco de dados"
      );

      if (
        !validateCasoUsoFields(
          nome,
          complexidade,
          descricao,
          res
        )
      ) {
        await connection("CASOS_DE_USO").insert({
          CAS_NOME: nome,
          CAS_COMPLEXIDADE: complexidade,
          CAS_DESCRICAO: descricao,
          FK_REQUISITOS_FUNCIONAIS_REQ_ID: req_id,
        });

        console.log("[INFO] Caso de Uso cadastrado com sucesso");

        return res.status(201).send();
      }
    } catch (err) {
      console.log(
        "[ERROR] [CasoUsoController] Erro no método create: " + err
      );
    }
  },

  async update(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de Caso de Uso");

      const { nome, complexidade, descricao } = req.body;

      const req_id = req.query.requisito;
      const cas_id = req.query.caso;

      console.log(
        "[INFO] Iniciando atualização do Caso de Uso no banco de dados"
      );

      if (
        !validateCasoUsoFields(
          nome,
          complexidade,
          descricao,
          res
        )
      ) {
        await connection("CASOS_DE_USO")
          .where({ CAS_ID: cas_id })
          .update({
            CAS_NOME: nome,
            CAS_COMPLEXIDADE: complexidade,
            CAS_DESCRICAO: descricao,
            FK_REQUISITOS_FUNCIONAIS_REQ_ID: req_id,
          });

        console.log("[INFO] Caso de Uso atualizado com sucesso");

        return res.status(200).send();
      }
    } catch (err) {
      console.log(
        "[ERROR] [CasoUsoController] Erro no método update: " + err
      );
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando exclusão de Caso de Uso");

      const cas_id = req.query.caso;

      console.log(
        "[INFO] Iniciando exclusão do Caso de Uso no banco de dados"
      );

      await connection("CASOS_DE_USO").where({ CAS_ID: cas_id }).del();

      console.log("[INFO] Caso de Uso excluído com sucesso");

      return res.status(200).send();
    } catch (err) {
      console.log(
        "[ERROR] [CasoUsoController] Erro no método delete: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de Caso de Uso por ID");

      const cas_id = req.query.id;
      console.log(cas_id);

      console.log(
        "[INFO] Iniciando busca do Caso de Uso no banco de dados"
      );

      const Caso = await connection("CASOS_DE_USO")
        .select("*")
        .where("CAS_ID", cas_id)
        .first();

      console.log("[INFO] Caso de Uso encontrado com sucesso");

      return res.json({
        id: Caso.CAS_ID,
        nome: Caso.CAS_NOME,
        complexidade: Caso.CAS_COMPLEXIDADE,
        descricao: Caso.CAS_DESCRICAO,
      });
    } catch (err) {
      console.log(
        "[ERROR] [CasoUsoController] Erro no método getById: " + err
      );
    }
  },

  async list(req, res) {
    try {
      console.log("");
      console.log(
        "[INFO] Iniciando listagem de Caso de Uso do Projeto"
      );
      const req_id = req.query.requisito;
      console.log(req_id);

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const Caso = await connection("CASOS_DE_USO")
        .select("*")
        .where("FK_REQUISITOS_FUNCIONAIS_REQ_ID", req_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = Caso.map((Caso) => {
        return {
          id: Caso.CAS_ID,
          nome: Caso.CAS_NOME,
          complexidade: Caso.CAS_COMPLEXIDADE,
          descricao: Caso.CAS_DESCRICAO,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("CASOS_DE_USO")
        .where("FK_REQUISITOS_FUNCIONAIS_REQ_ID", req_id)
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
        "[ERROR] [CasoUsoController] Erro no método list: " + error
      );
    }
  },

  async listByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de Caso de Uso");
      const req_id = req.query.projeto;
      const nome = req.query.nome;

      console.log(req_id);

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const Caso = await connection("CASOS_DE_USO")
        .select("*")
        .where("FK_REQUISITOS_FUNCIONAIS_REQ_ID", req_id)
        .andWhereLike("CAS_NOME", `%${nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = Caso.map((Caso) => {
        return {
          id: Caso.CAS_ID,
          nome: Caso.CAS_NOME,
          complexidade: Caso.CAS_COMPLEXIDADE,
          descricao: Caso.CAS_DESCRICAO,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("CASOS_DE_USO")
        .where("FK_REQUISITOS_FUNCIONAIS_REQ_ID", req_id)
        .andWhereLike("CAS_NOME", `%${nome}%`)
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
        "[ERROR] [CasoUsoController] Erro no método listByNamePaginated: " +
          error
      );
    }
  },

  async getNumberOfCasos(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de casos de uso");

      const uc_id = req.query.caso;

      const totalCountQuery = connection("REQUISITOS_FUNCIONAIS")
        .join("CASOS_DE_USO", "REQUISITOS_FUNCIONAIS.REQ_ID", "=", "CASOS_DE_USO.FK_REQUISITOS_FUNCIONAIS_REQ_ID")
        .where("CASOS_DE_USO.FK_REQUISITOS_FUNCIONAIS_REQ_ID", uc_id)
        .count("* as totalCount")
        .first();

      const { totalCount } = await totalCountQuery;

      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [CasoUsoController] Erro no método getNumberOfCasos: " + err);
    }
  },

  async getNumberOfCasosSimples(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de casos de uso simples");
  
      const uc_id = req.query.caso;
  
      const totalCountQuery = await connection("CASOS_DE_USO")
        .where("CASOS_DE_USO.FK_REQUISITOS_FUNCIONAIS_REQ_ID", uc_id)
        .andWhere("CAS_COMPLEXIDADE", "=", "SIMPLES")
        .count("* as totalCount")
        .first();
  
      const { totalCount } = totalCountQuery;
  
      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [CasoUsoController] Erro no método getNumberOfCasosSimples: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getNumberOfCasosMedios(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de casos de uso médios");
  
      const uc_id = req.query.caso;
  
      const totalCountQuery = await connection("CASOS_DE_USO")
        .where("CASOS_DE_USO.FK_REQUISITOS_FUNCIONAIS_REQ_ID", uc_id)
        .andWhere("CAS_COMPLEXIDADE", "=", "MEDIO")
        .count("* as totalCount")
        .first();
  
      const { totalCount } = totalCountQuery;
  
      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [CasoUsoController] Erro no método getNumberOfCasosMedios: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getNumberOfCasosComplexos(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de casos de uso complexos");
  
      const uc_id = req.query.caso;
  
      const totalCountQuery = await connection("CASOS_DE_USO")
        .where("CASOS_DE_USO.FK_REQUISITOS_FUNCIONAIS_REQ_ID", uc_id)
        .andWhere("CAS_COMPLEXIDADE", "=", "COMPLEXO")
        .count("* as totalCount")
        .first();
  
      const { totalCount } = totalCountQuery;
  
      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [CasoUsoController] Erro no método getNumberOfCasosComplexos: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
};

function validateCasoUsoFields(nome, descricao, complexidade, res) {
    console.log("[INFO] Verificando campos do caso de uso");

    if (!nome || !complexidade || !descricao) {
      return res.status(400).json({ error: "Campos obrigatórios não informados" });
    }
  
    const isValidNome = nome.length >= 5 && nome.length <= 100;
    const isValidDescricao = descricao.length >= 5 && descricao.length <= 255;
  
    if (!isValidNome) {
      return res.status(400).json({ error: "Nome inválido" });
    }
  
    if (!isValidDescricao) {
      return res.status(400).json({ error: "Descrição inválida" });
    }
}
