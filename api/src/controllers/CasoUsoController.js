import connection from "../database/databaseConnection.js";

export const CasoUsoController = {
  async list(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de casos de uso");

      const uc_id = req.query.user;
      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pagesize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      // PESQUISA COM PAGINAÇÃO
      const CasoUso = await connection("CASO_DE_USO")
        .select("*")
        .where("FK_REQUISITOS_FUNCIONAIS_REQ_ID", uc_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = CasoUso.map((item) => {
        return {
          id: item.CAS_ID,
          nome: item.CAS_NOME,
          descricao: item.CAS_DESCRICAO,
          complexidade: item.CAS_COMPLEXIDADE,
        };
      });

      // ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = connection("CASO_DE_USO")
        .where("FK_REQUISITOS_FUNCIONAIS_REQ_ID", uc_id)
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
      console.log("[ERROR] [CasoUsoController] Erro no método list: " + err);
    }
  },

  async listByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de casos de uso por nome");

      const uc_id = req.query.requisitos; // Arrumar aqui ////////////////////////// Verificar rota
      console.log(uc_id);
      const uc_nome = req.query.nome;
      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10.

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      // PESQUISA COM PAGINAÇÃO
      const CasoUso = await connection("CASOS_DE_USO")
        .select("*") 
        .where("FK_REQUISITOS_FUNCIONAIS_REQ_ID", uc_id)
        .andWhereLike("CAS_NOME", `%${uc_nome}%`)
        .offset(offset)
        .limit(pageSize);

      const serializedItems = CasoUso.map((item) => ({
        id: item.CAS_ID,
        nome: item.CAS_NOME,
        complexidade: item.CAS_COMPLEXIDADE,
        descricao: item.CAS_DESCRICAO,
      }));

      const totalCountQuery = connection("CASOS_DE_USO")
        .where("FK_REQUISITOS_FUNCIONAIS_REQ_ID", uc_id)
        .andWhereLike("CAS_NOME", `%${uc_nome}%`)
        .count("* as totalCount")
        .first();

      const { totalCount } = await totalCountQuery;
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
        "[ERROR] [CasoUsoController] Erro no método listByName: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de casos de uso por id");

      const caso_id = req.query.caso;
        console.log(caso_id);

      const caso = await connection("CASOS_DE_USO")
        .select("*")
        .where("CAS_ID", caso_id)
        .first();

      const serializedItems = {
        id: caso.CAS_ID,
        nome: caso.CAS_NOME,
        complexidade: caso.CAS_COMPLEXIDADE,
        descricao: caso.CAS_DESCRICAO,
      };

      return res.json(serializedItems);
    } catch (err) {
      console.log("[ERROR] [CasoUsoController] Erro no método getById: " + err);
    }
  },

  async create(req, res) {
    try {
        console.log("");
        console.log("[INFO] Iniciando cadastro de caso de uso")
  
        const {nome, descricao, complexidade  } = req.body;
        
        const uc_id = req.query; // caso null //****///****////****//////////// */ */ */
        console.log(uc_id);
      
        console.log("[INFO] Iniciando inserção do caso de uso no banco de dados")
  
        if(!validateCasoUsoFields(nome, descricao, complexidade, res)) {
  
          const trx = await connection.transaction();
  
          const insertedIds = await trx("CASOS_DE_USO").insert({
            CAS_NOME: nome,
            CAS_DESCRICAO: descricao,
            CAS_COMPLEXIDADE: complexidade, 
            FK_REQUISITOS_FUNCIONAIS_REQ_ID: 1, // Arrumar isso aqui  /////*//////***///////****///////// */ */
           });
  
          await trx.commit();
  
          console.log("[INFO] caso de uso cadastrado com sucesso")
  
          return res.status(201).send();
  
        }
  
      } catch (err) {
        console.log("[ERROR] [CasoUsoController] Erro no método create: " + err);
      }
  },

  async update(req, res) {
    try {
        console.log("");
        console.log("[INFO] Iniciando atualização de caso de uso")
  
        const {nome, complexidade, descricao} = req.body;
        
        const caso_id = req.query; // Arrumar isso aqui /////*****///////////****///////*** */ */ */
        console.log(caso_id);
        console.log(nome, complexidade, descricao);
      
        console.log("[INFO] Iniciando atualização do caso de uso no banco de dados")
  
        if(!validateCasoUsoFields(nome, complexidade, descricao, res)) {
  
          const trx = await connection.transaction();
  
          await trx("CASOS_DE_USO").where(
            "CAS_ID",
            caso_id
          ).update({
            CAS_NOME: nome,
            CAS_COMPLEXIDADE: complexidade,
            CAS_DESCRICAO: descricao,
          });
  
          await trx.commit();
  
          console.log("[INFO] Caso de uso atualizado com sucesso")
  
          return res.status(200).send();
  
        }
  
      } catch (err) {
        console.log("[ERROR] [CasoUsoController] Erro no método update: " + err);
      }
  },

  async delete(req, res) {
    try {
        console.log("");
        console.log("[INFO] Iniciando exclusão de caso de uso")
  
        const caso_id = req.query.casoUso;
        console.log(caso_id);
      
        console.log("[INFO] Iniciando exclusão de ccaso de uso no banco de dados")
  
        const trx = await connection.transaction();
  
        await trx("CASOS_DE_USO").where(
          "CAS_ID",
          caso_id
        ).delete();
  
        await trx.commit();
  
        console.log("[INFO] Caso de uso excluído com sucesso")
  
        return res.status(200).send();
  
      } catch (err) {
        console.log("[ERROR] [CasoUsoController] Erro no método delete: " + err);
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
