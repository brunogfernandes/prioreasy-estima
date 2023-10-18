import connection from "../database/databaseConnection.js";

export const CenariosController = {
  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de Cenarios");

      const { nome, tipo, descricao } = req.body;

      const cas_id = req.query.caso;
      console.log(cas_id);

      console.log(
        "[INFO] Iniciando inserção do Cenario no banco de dados"
      );

      if (
        !validateCenariosFields(
          nome,
          tipo,
          descricao,
          res
        )
      ) {
        await connection("CENARIOS").insert({
          CEN_NOME: nome,
          CEN_TIPO: tipo,
          CEN_DESCRICAO: descricao,
          FK_CASOS_DE_USO_CAS_ID: cas_id,
        });

        console.log("[INFO] Cenario cadastrado com sucesso");

        return res.status(201).send();
      }
    } catch (err) {
      console.log(
        "[ERROR] [CenarioController] Erro no método create: " + err
      );
    }
  },

  async update(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de Cenario");

      const { nome, tipo, descricao } = req.body;

      const cas_id = req.query.caso;
      const cen_id = req.query.cenario;

      console.log(
        "[INFO] Iniciando atualização do Cenario no banco de dados"
      );

      if (
        !validateCenariosFields(
          nome,
          tipo,
          descricao,
          res
        )
      ) {
        await connection("CENARIOS")
          .where({ CEN_ID: cen_id })
          .update({
            CEN_NOME: nome,
            CEN_TIPO: tipo,
            CEN_DESCRICAO: descricao,
            FK_CASOS_DE_USO_CAS_ID: cas_id,
          });

        console.log("[INFO] Cenario atualizado com sucesso");

        return res.status(200).send();
      }
    } catch (err) {
      console.log(
        "[ERROR] [CenarioController] Erro no método update: " + err
      );
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando exclusão de Cenario");

      const cen_id = req.query.cenario;

      console.log(
        "[INFO] Iniciando exclusão do cenario no banco de dados"
      );

      await connection("CENARIOS").where({ CEN_ID: cen_id }).del();

      console.log("[INFO] Cenario excluído com sucesso");

      return res.status(200).send();
    } catch (err) {
      console.log(
        "[ERROR] [CenarioController] Erro no método delete: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de Cenario por ID");

      const cen_id = req.query.id;

      console.log(
        "[INFO] Iniciando busca do Cenario no banco de dados"
      );

      const Cenario = await connection("CENARIOS")
        .select("*")
        .where("CEN_ID", cen_id)
        .first();

      console.log("[INFO] Cenarios encontrado com sucesso");

      return res.json({
        id: Cenario.CEN_ID,
        nome: Cenario.CEN_NOME,
        tipo: Cenario.CEN_TIPO,
        descricao: Cenario.CEN_DESCRICAO,
      });
    } catch (err) {
      console.log(
        "[ERROR] [CenarioController] Erro no método getById: " + err
      );
    }
  },

  async list(req, res) {
    try {
      console.log("");
      console.log(
        "[INFO] Iniciando listagem de Cenario do Projeto"
      );
      const cas_id = req.query.caso;
      console.log(cas_id);

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const Cenario = await connection("CENARIOS")
        .select("*")
        .where("FK_CASOS_DE_USO_CAS_ID", cas_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = Cenario.map((Cenario) => {
        return {
          id: Cenario.CEN_ID,
          nome: Cenario.CEN_NOME,
          tipo: Cenario.CEN_TIPO,
          descricao: Cenario.CEN_DESCRICAO,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("CENARIOS")
        .where("FK_CASOS_DE_USO_CAS_ID", cas_id)
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
        "[ERROR] [CenarioController] Erro no método list: " + error
      );
    }
  },

  async listByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de Cenario");

      const cas_id = req.query.caso;
      const nome = req.query.nome;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const Cenario = await connection("CENARIOS")
        .select("*")
        .where("FK_CASOS_DE_USO_CAS_ID", cas_id)
        .andWhereLike("CEN_NOME", `%${nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = Cenario.map((Cenario) => {
        return {
          id: Cenario.CEN_ID,
          nome: Cenario.CEN_NOME,
          tipo: Cenario.CEN_TIPO,
          descricao: Cenario.CEN_DESCRICAO,
        };
      });

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("CENARIOS")
        .where("FK_CASOS_DE_USO_CAS_ID", cas_id)
        .andWhereLike("CEN_NOME", `%${nome}%`)
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
        "[ERROR] [CenarioController] Erro no método listByNamePaginated: " +
          error
      );
    }
  },
};

function validateCenariosFields(nome, descricao, tipo, res) {
    console.log("[INFO] Verificando campos do caso de uso");

    if (!nome || !tipo || !descricao) {
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
