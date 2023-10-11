import connection from "../database/databaseConnection.js";

export const CenariosController = {
  async list(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de Cenarios");

      const cen_id = req.query.user;
      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pagesize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      // PESQUISA COM PAGINAÇÃO
      const Cenarios = await connection("CENARIOS")
        .select("*")
        .where("FK_CASOS_DE_USO_CAS_ID", cen_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = Cenarios.map((item) => {
        return {
          id: item.CEN_ID,
          nome: item.CEN_NOME,
          descricao: item.CEN_DESCRICAO,
          tipo: item.CEN_TIPO,
        };
      });

      // ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = connection("CENARIOS")
        .where("FK_CASOS_DE_USO_CAS_ID", cen_id)
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
      console.log("[ERROR] [CenariosController] Erro no método list: " + err);
    }
  },

  async listByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de cenarios por nome");

      const cen_id = req.query.cenarios; // Arrumar aqui ////////////////////////// Verificar rota
      console.log(cen_id);
      const cen_nome = req.query.nome;
      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10.

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      // PESQUISA COM PAGINAÇÃO
      const Cenarios = await connection("CENARIOS")
        .select("*") 
        .where("FK_CASOS_DE_USO_CAS_ID", cen_id)
        .andWhereLike("CEN_NOME", `%${cen_nome}%`)
        .offset(offset)
        .limit(pageSize);

      const serializedItems = Cenarios.map((item) => ({
        id: item.CEN_ID,
        nome: item.CEN_NOME,
        tipo: item.CEN_TIPO,
        descricao: item.CEN_DESCRICAO,
      }));

      const totalCountQuery = connection("CENARIOS")
        .where("FK_CASOS_DE_USO_CAS_ID",cen_id)
        .andWhereLike("CEN_NOME", `%${cen_nome}%`)
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
        "[ERROR] [CenariosController] Erro no método listByName: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de cenarios por id");

      const cen_id = req.query.caso;
        console.log(cen_id);

      const cen = await connection("CENARIOS")
        .select("*")
        .where("CEN_ID", cen_id)
        .first();

      const serializedItems = {
        id: cen.CEN_ID,
        nome: cen.CEN_NOME,
        tipo: cen.CEN_TIPO,
        descricao: cen.CEN_DESCRICAO,
      };

      return res.json(serializedItems);
    } catch (err) {
      console.log("[ERROR] [CenariosController] Erro no método getById: " + err);
    }
  },

  async create(req, res) {
    try {
        console.log("");
        console.log("[INFO] Iniciando cadastro de cenario")
  
        const {nome, descricao, tipo  } = req.body;
        
        const cen_id = req.query.cenarios; // caso null //****///****////****//////////// */ */ */
        console.log(cen_id);
        console.log(nome, descricao, tipo);
      
        console.log("[INFO] Iniciando inserção de cenario no banco de dados")
  
        if(!validateCenariosFields(nome, descricao, tipo, res)) {
  
          const trx = await connection.transaction();
  
          const insertedIds = await trx("CENARIOS").insert({
            CEN_NOME: nome,
            CEN_DESCRICAO: descricao,
            CEN_TIPO: tipo, 
            FK_CASOS_DE_USO_CAS_ID: 1, // Arrumar isso aqui  /////*//////***///////****///////// */ */
           });


          await trx.commit();
  
          console.log("[INFO] Cenarios cadastrado com sucesso")
  
          return res.status(201).send();
  
        }
  
      } catch (err) {
        console.log("[ERROR] [CenariosController] Erro no método create: " + err);
      }
  },

  async update(req, res) {
    try {
        console.log("");
        console.log("[INFO] Iniciando atualização de cenario")
  
        const {nome, tipo, descricao} = req.body;
        
        const cen_id = req.query.cenario; // Arrumar isso aqui /////*****///////////****///////*** */ */ */
        console.log(cen_id);
        console.log(nome, tipo, descricao);
      
        console.log("[INFO] Iniciando atualização de cenario no banco de dados")
  
        if(!validateCenariosFields(nome, tipo, descricao, res)) {
  
          const trx = await connection.transaction();
  
          await trx("CENARIOS").where(
            "CEN_ID",
            cen_id
          ).update({
            CEN_NOME: nome,
            CEN_TIPO: tipo,
            CEN_DESCRICAO: descricao,
          });
  
          await trx.commit();
  
          console.log("[INFO] Cenario atualizado com sucesso")
  
          return res.status(200).send();
  
        }
  
      } catch (err) {
        console.log("[ERROR] [CenariosController] Erro no método update: " + err);
      }
  },

  async delete(req, res) {
    try {
        console.log("");
        console.log("[INFO] Iniciando exclusão de cenario")
  
        const cen_id = req.query.cenario;
        console.log(cen_id);
      
        console.log("[INFO] Iniciando exclusão de cenario no banco de dados")
  
        const trx = await connection.transaction();
  
        await trx("CENARIOS").where(
          "CEN_ID",
          cen_id
        ).delete();
  
        await trx.commit();
  
        console.log("[INFO] Cenario excluído com sucesso")
  
        return res.status(200).send();
  
      } catch (err) {
        console.log("[ERROR] [CenariosController] Erro no método delete: " + err);
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
