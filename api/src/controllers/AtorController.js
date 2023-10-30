import connection from "../database/databaseConnection.js";

export const AtoresController = {
  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de Atores");

      const { nome, complexidade, descricao } = req.body;

      const pro_id = req.query.projeto;

      console.log(
        "[INFO] Iniciando inserção do Ator no banco de dados"
      );

      if (
        !validateAtorFields(
          nome,
          complexidade,
          descricao,
          res
        )
      ) {
        await connection("ATORES").insert({
          ATO_NOME: nome,
          ATO_COMPLEXIDADE: complexidade,
          ATO_DESCRICAO: descricao,
          FK_PROJETOS_PRO_ID: pro_id,
        });

        console.log("[INFO] Ator cadastrado com sucesso");

        return res.status(201).send();
      }
    } catch (err) {
      console.log(
        "[ERROR] [AtoresController] Erro no método create: " + err
      );
    }
  },

  async update(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de Atores");

      const { nome, complexidade, descricao } = req.body;

      const pro_id = req.query.projeto;
      const ato_id = req.query.atores;

      console.log(
        "[INFO] Iniciando atualização do Ator no banco de dados"
      );

      if (
        !validateAtorFields(
          nome,
          complexidade,
          descricao,
          res
        )
      ) {
        await connection("ATORES")
          .where({ ATO_ID: ato_id })
          .update({
            ATO_NOME: nome,
            ATO_COMPLEXIDADE: complexidade,
            ATO_DESCRICAO: descricao,
            FK_PROJETOS_PRO_ID: pro_id,
          });

        console.log("[INFO] Ator atualizado com sucesso");

        return res.status(200).send();
      }
    } catch (err) {
      console.log(
        "[ERROR] [AtoresController] Erro no método update: " + err
      );
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando exclusão de Ator");

      const ato_id = req.query.atores;

      console.log(
        "[INFO] Iniciando exclusão do Ator no banco de dados"
      );

      await connection("ATORES").where({ ATO_ID: ato_id }).del();

      console.log("[INFO] Ator excluído com sucesso");

      return res.status(200).send();
    } catch (err) {
      console.log(
        "[ERROR] [AtoresController] Erro no método delete: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de Atores por ID");

      const ato_id = req.query.id;
      console.log(ato_id);

      console.log(
        "[INFO] Iniciando busca do Atores no banco de dados"
      );

      const Atores = await connection("ATORES")
        .select("*")
        .where("ATO_ID", ato_id)
        .first();

      console.log("[INFO] Ator encontrado com sucesso");

      return res.json({
        id: Atores.ATO_ID,
        nome: Atores.ATO_NOME,
        complexidade: Atores.ATO_COMPLEXIDADE,
        descricao: Atores.ATO_DESCRICAO,
      });
    } catch (err) {
      console.log(
        "[ERROR] [AtoresController] Erro no método getById: " + err
      );
    }
  },

  async list(req, res) {
    try {
      console.log("");
      console.log(
        "[INFO] Iniciando listagem de Atores do Projeto"
      );
      const pro_id = req.query.projeto;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const Atores = await connection("ATORES")
        .select("*")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = Atores.map((Atores) => {
        return {
          id: Atores.ATO_ID,
          nome: Atores.ATO_NOME,
          complexidade: Atores.ATO_COMPLEXIDADE,
          descricao: Atores.ATO_DESCRICAO,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("ATORES")
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
        "[ERROR] [AtoresController] Erro no método list: " + error
      );
    }
  },

  async listByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de Atores");

      const pro_id = req.query.projeto;
      const nome = req.query.nome;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const Atores = await connection("ATORES")
        .select("*")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("ATO_NOME", `%${nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = Atores.map((Atores) => {
        return {
          id: Atores.ATO_ID,
          nome: Atores.ATO_NOME,
          complexidade: Atores.ATO_COMPLEXIDADE,
          descricao: Atores.ATO_DESCRICAO,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("ATORES")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("ATO_NOME", `%${nome}%`)
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
        "[ERROR] [AtoresController] Erro no método listByNamePaginated: " +
          error
      );
    }
  },
  async getNumberOfAtores(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de atores do projeto");
  
      const pro_id  = req.query.atores;
  
      const totalCountQuery = await connection("PROJETOS")
        .join("ATORES", "PROJETOS.PRO_ID", "=", "ATORES.FK_PROJETOS_PRO_ID")
        .where("ATORES.FK_PROJETOS_PRO_ID", pro_id)
        .count("* as totalCount")
        .first();
  
      const { totalCount } = totalCountQuery;
  
      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [AtoresController] Erro no método getNumberOfAtores: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getNumberOfAtoresSimples(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de atores simples");
  
      const pro_id = req.query.atores;
  
      const totalCountQuery = await connection("ATORES")
        .where("ATORES.FK_PROJETOS_PRO_ID", pro_id)
        .andWhere("ATO_COMPLEXIDADE", "=", "SIMPLES")
        .count("* as totalCount")
        .first();
  
      const { totalCount } = totalCountQuery;


  
      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [AtoresController] Erro no método getNumberOfAtoresSimples: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getNumberOfAtoresMedios(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de atores médios");
  
      const pro_id = req.query.atores;
  
      const totalCountQuery = await connection("ATORES")
        .where("ATORES.FK_PROJETOS_PRO_ID", pro_id)
        .andWhere("ATO_COMPLEXIDADE", "=", "MEDIO")
        .count("* as totalCount")
        .first();
  
      const { totalCount } = totalCountQuery;
  
      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [AtoresController] Erro no método getNumberOfAtoresMedios: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getNumberOfAtoresComplexos(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de atores complexos");
  
      const pro_id = req.query.atores;
  
      const totalCountQuery = await connection("ATORES")
        .where("ATORES.FK_PROJETOS_PRO_ID", pro_id)
        .andWhere("ATO_COMPLEXIDADE", "=", "COMPLEXO")
        .count("* as totalCount")
        .first();
  
      const { totalCount } = totalCountQuery;
  
      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [AtoresController] Erro no método getNumberOfAtoresComplexos: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

function validateAtorFields(nome, descricao, complexidade, res) {
  console.log("[INFO] Verificando campos do Ator");

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