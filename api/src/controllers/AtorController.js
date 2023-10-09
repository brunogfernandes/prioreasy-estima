import connection from "../database/databaseConnection.js";

export const AtoresController = {
  async list(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de atores do projeto");

      const pro_id = req.quer;
      const page = parseInt(req.query.page, 10) || 0;
      const pageSize = parseInt(req.query.pagesize, 10) || 5;
      const offset = page * pageSize;

      const Atores = await connection("ATORES")
        .select("*")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .offset(offset)
        .limit(pageSize);

      const serializedItems = Atores.map((item) => ({
        id: item.ATO_ID,
        nome: item.ATO_NOME,
        complexidade: item.ATO_COMPLEXIDADE,
        descricao: item.ATO_DESCRICAO,
      }));

      const totalCountQuery = connection("ATORES")
        .where("FK_PROJETOS_PRO_ID", pro_id)
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
      console.log("[ERROR] [AtoresController] Erro no método list: " + err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async listByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de atores do projeto por nome");

      const pro_id = req.query.projetos; //Verificar se esta certo //*************//******///*****// */ */ */
      const pro_nome = req.query.nome;
      const page = parseInt(req.query.page, 10) || 0;
      const pageSize = parseInt(req.query.pageSize, 10) || 5;
      const offset = page * pageSize;

      const Atores = await connection("ATORES")
        .select("*") 
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("ATO_NOME", `%${pro_nome}%`)
        .offset(offset)
        .limit(pageSize);

      const serializedItems = Atores.map((item) => ({
        id: item.ATO_ID,
        nome: item.ATO_NOME,
        complexidade: item.ATO_COMPLEXIDADE,
        descricao: item.ATO_DESCRICAO,
      }));

      const totalCountQuery = connection("ATORES")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .andWhereLike("ATO_NOME", `%${pro_nome}%`)
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
      console.log("[ERROR] [AtoresController] Erro no método listByName: " + err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de atores por id");
 
      const atores_id = req.query.atores;
      console.log(atores_id);

      const atores = await connection("ATORES")
        .select("*")
        .where("ATO_ID", atores_id)
        .first();

      const serializedItems = {
        id: atores.ATO_ID,
        nome: atores.ATO_NOME,
        complexidade: atores.ATO_COMPLEXIDADE,
        descricao: atores.ATO_DESCRICAO,
      };

      return res.json(serializedItems);
    } catch (err) {
      console.log("[ERROR] [AtoresController] Erro no método getById: " + err);
    }
  },

  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de atores")

      const {nome, descricao, complexidade  } = req.body;
      
      const pro_id = req.query; // ator null //****///****////****//////////// */ */ */
      console.log(pro_id);
    
      console.log("[INFO] Iniciando inserção do atores no banco de dados")

      if(!validateAtorFields(nome, descricao, complexidade, res)) {

        const trx = await connection.transaction();

        const insertedIds = await trx("ATORES").insert({
          ATO_NOME: nome,
          ATO_DESCRICAO: descricao,
          ATO_COMPLEXIDADE: complexidade, 
          FK_PROJETOS_PRO_ID: 1, // Arrumar isso aqui  /////*//////***///////****///////// */ */
         });

        await trx.commit();

        console.log("[INFO] atores cadastrado com sucesso")

        return res.status(201).send();

      }

    } catch (err) {
      console.log("[ERROR] [AtoresController] Erro no método create: " + err);
    }
  },

  async update(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de atores")

      const {nome, complexidade, descricao} = req.body;
      
      const atores_id = req.query.atores;
      console.log(atores_id);
      console.log(nome, complexidade, descricao);
    
      console.log("[INFO] Iniciando atualização do atores no banco de dados")

      if(!validateAtorFields(nome, complexidade, descricao, res)) {

        const trx = await connection.transaction();

        await trx("ATORES").where(
          "ATO_ID",
          atores_id
        ).update({
          ATO_NOME: nome,
          ATO_COMPLEXIDADE: complexidade,
          ATO_DESCRICAO: descricao,
        });

        await trx.commit();

        console.log("[INFO] Atores atualizado com sucesso")

        return res.status(200).send();

      }

    } catch (err) {
      console.log("[ERROR] [AtoresController] Erro no método update: " + err);
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando exclusão de atores")

      const atores_id = req.query.atores;
      console.log(atores_id);
    
      console.log("[INFO] Iniciando exclusão do atores no banco de dados")

      const trx = await connection.transaction();

      await trx("ATORES").where(
        "ATO_ID",
        atores_id
      ).delete();

      await trx.commit();

      console.log("[INFO] Ator excluído com sucesso")

      return res.status(200).send();

    } catch (err) {
      console.log("[ERROR] [AtoresController] Erro no método delete: " + err);
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

function validateAtorFields(nome, complexidade, descricao, res) {
  console.log("[INFO] Verificando campos do atores");
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
