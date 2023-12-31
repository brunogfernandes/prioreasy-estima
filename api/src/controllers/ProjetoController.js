import connection from "../database/databaseConnection.js";

export const ProjetoController = {
  async list(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de projetos do usuário");

      const col_id = req.query.user;
      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pagesize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      // PESQUISA COM PAGINAÇÃO
      const projects = await connection("PROJETOS")
        .select("*")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = projects.map((item) => {
        return {
          id: item.PRO_ID,
          nome: item.PRO_NOME,
          descricao: item.PRO_DESCRICAO,
          empresa: item.PRO_EMPRESA,
          dataInicio: item.PRO_DATA_INICIO,
          previsaoFim: item.PRO_PREVISAO_FIM,
          status: item.PRO_STATUS,
        };
      });

      // ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = connection("PROJETOS")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
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
      console.log("[ERROR] [ProjetoController] Erro no método list: " + err);
    }
  },

  async listByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de projetos do usuário por nome");

      const col_id = req.query.user;
      const pro_nome = req.query.nome;
      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10.

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      // PESQUISA COM PAGINAÇÃO
      const projects = await connection("PROJETOS")
        .select("*")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
        .andWhereLike("PROJETOS.PRO_NOME", `%${pro_nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = projects.map((item) => {
        return {
          id: item.PRO_ID,
          nome: item.PRO_NOME,
          descricao: item.PRO_DESCRICAO,
          empresa: item.PRO_EMPRESA,
          dataInicio: item.PRO_DATA_INICIO.toLocaleDateString(),
          previsaoFim: item.PRO_PREVISAO_FIM.toLocaleDateString(),
          status: item.PRO_STATUS,
          admin: item.COP_ADMINISTRADOR
        };
      });

      // ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = connection("PROJETOS")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
        .andWhereLike("PROJETOS.PRO_NOME", `%${pro_nome}%`)
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
        "[ERROR] [ProjetoController] Erro no método listByName: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de projeto por id");

      const project_id = req.query.projeto;
      const col_id = req.query.colaborador;

      const project = await connection("PROJETOS")
        .select("*")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("PRO_ID", project_id)
        .andWhere("FK_COLABORADORES_COL_ID", col_id)
        .first();

      const serializedItems = {
        id: project.PRO_ID,
        nome: project.PRO_NOME,
        descricao: project.PRO_DESCRICAO,
        empresa: project.PRO_EMPRESA,
        dataInicio: project.PRO_DATA_INICIO.toLocaleDateString(),
        previsaoFim: project.PRO_PREVISAO_FIM.toLocaleDateString(),
        status: project.PRO_STATUS,
        admin: project.COP_ADMINISTRADOR
      };

      return res.json(serializedItems);
    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método getById: " + err);
    }
  },


  async getByStakeholderId(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de projetos por id do stakeholder");

      const sta_id = req.query.stakeholder;

      const projects = await connection("STAKEHOLDERS")
        .select("*")
        .join(
          "PROJETOS",
          "STAKEHOLDERS.FK_PROJETOS_PRO_ID",
          "=",
          "PROJETOS.PRO_ID"
        )
        .where("STA_ID", sta_id)
        .first();

      const serializedItems = {
        id: projects.PRO_ID,
        nome: projects.PRO_NOME,
        descricao: projects.PRO_DESCRICAO,
        empresa: projects.PRO_EMPRESA,
        dataInicio: projects.PRO_DATA_INICIO.toLocaleDateString(),
        previsaoFim: projects.PRO_PREVISAO_FIM.toLocaleDateString(),
        status: projects.PRO_STATUS,
      };

      return res.json(serializedItems);
    } catch (error) {
      console.log("[ERROR] [ProjetoController] Erro no método getByStakeholderId: " + err);
    }
  },

  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de projeto")

      const {nome, descricao, empresa, dataInicio, previsaoFim, status} = req.body;
      
      const col_id = req.query.user;
    
      console.log("[INFO] Iniciando inserção do projeto no banco de dados")

      if(!validateProjectFields(nome, descricao, empresa, dataInicio, previsaoFim, status, res)) {

        const trx = await connection.transaction();

        const insertedIds = await trx("PROJETOS").insert({
          PRO_NOME: nome,
          PRO_DESCRICAO: descricao,
          PRO_EMPRESA: empresa,
          PRO_DATA_INICIO: dataInicio,
          PRO_PREVISAO_FIM: previsaoFim,
          PRO_STATUS: status,
        });

        const pro_id = insertedIds[0];

        await trx("COLABORADORES_PROJETOS").insert({
          FK_COLABORADORES_COL_ID: col_id,
          FK_PROJETOS_PRO_ID: pro_id,
          COP_ADMINISTRADOR: true,
          COP_ATIVO: true,
        });

        await trx.commit();

        console.log("[INFO] Projeto cadastrado com sucesso")

        return res.status(201).send();

      }

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método create: " + err);
    }
  },

  async update(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de projeto")

      const {nome, descricao, empresa, dataInicio, previsaoFim, status} = req.body;
      
      const project_id = req.query.projeto;
    
      console.log("[INFO] Iniciando atualização do projeto no banco de dados")

      if(!validateProjectFields(nome, descricao, empresa, dataInicio, previsaoFim, status, res)) {

        const trx = await connection.transaction();

        await trx("PROJETOS").where(
          "PRO_ID",
          project_id
        ).update({
          PRO_NOME: nome,
          PRO_DESCRICAO: descricao,
          PRO_EMPRESA: empresa,
          PRO_DATA_INICIO: dataInicio,
          PRO_PREVISAO_FIM: previsaoFim,
          PRO_STATUS: status,
        });

        await trx.commit();

        console.log("[INFO] Projeto atualizado com sucesso")

        return res.status(200).send();

      }

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método update: " + err);
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando exclusão de projeto")

      const project_id = req.query.projeto;
    
      console.log("[INFO] Iniciando exclusão do projeto no banco de dados")

      const trx = await connection.transaction();

      await trx("COLABORADORES_PROJETOS").where(
        "FK_PROJETOS_PRO_ID",
        project_id
      ).delete();

      await trx("PROJETOS").where(
        "PRO_ID",
        project_id
      ).delete();

      await trx.commit();

      console.log("[INFO] Projeto excluído com sucesso")

      return res.status(200).send();

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método delete: " + err);
    }
  },

  async listCollaborators(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de colaboradores do projeto");

      const project_id = req.query.projeto;
      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      // PESQUISA COM PAGINAÇÃO
      const collaborators = await connection("COLABORADORES")
        .select("*")
        .join(
          "COLABORADORES_PROJETOS",
          "COLABORADORES.COL_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID", project_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = collaborators.map((item) => {
        return {
          id: item.COL_ID,
          nome: item.COL_NOME,
          email: item.COL_EMAIL,
          empresa: item.COL_EMPRESA,
          cargo: item.COL_CARGO,
        };
      });

      // ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = connection("COLABORADORES")
        .join(
          "COLABORADORES_PROJETOS",
          "COLABORADORES.COL_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID", project_id)
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
          totalPages,
          number: page,
        }
      });
    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método listCollaboratorsPaginated: " + err);
    }
  },

  async listCollaboratorsByName(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem de colaboradores do projeto por nome");

      const project_id = req.query.projeto;
      const col_nome = req.query.nome;
      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      // PESQUISA COM PAGINAÇÃO
      const collaborators = await connection("COLABORADORES")
        .select("*")
        .join(
          "COLABORADORES_PROJETOS",
          "COLABORADORES.COL_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID", project_id)
        .andWhereLike("COLABORADORES.COL_NOME", `%${col_nome}%`)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

      const serializedItems = collaborators.map((item) => {
        return {
          id: item.COL_ID,
          nome: item.COL_NOME,
          email: item.COL_EMAIL,
          empresa: item.COL_EMPRESA,
          cargo: item.COL_CARGO,
        };
      });

      // ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = connection("COLABORADORES")
        .join(
          "COLABORADORES_PROJETOS",
          "COLABORADORES.COL_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID", project_id)
        .andWhereLike("COLABORADORES.COL_NOME", `%${col_nome}%`)
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
          totalPages,
          number: page,
        }
      });
    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método listCollaboratorsByName: " + err);
    }
  },

  async addCollaborator(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando adição de colaborador ao projeto")

      const col_id = req.query.colaborador;
      const pro_id = req.query.projeto;
    
      console.log("[INFO] Iniciando adição do colaborador ao projeto no banco de dados")

      const trx = await connection.transaction();

      await trx("COLABORADORES_PROJETOS").insert({
        FK_COLABORADORES_COL_ID: col_id,
        FK_PROJETOS_PRO_ID: pro_id,
        COP_ADMINISTRADOR: false,
        COP_ATIVO: true,
      });

      await trx.commit();

      console.log("[INFO] Colaborador adicionado ao projeto com sucesso")

      return res.status(200).send();

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método addCollaborator: " + err);
    }
  },

  async removeCollaborator(req, res){
    try {
      console.log("");
      console.log("[INFO] Iniciando remoção de colaborador do projeto")

      const col_id = req.query.colaborador;
      const pro_id = req.query.projeto;
    
      console.log("[INFO] Iniciando remoção do colaborador do projeto no banco de dados")

      const trx = await connection.transaction();

      await trx("COLABORADORES_PROJETOS").where({
        FK_COLABORADORES_COL_ID: col_id,
        FK_PROJETOS_PRO_ID: pro_id,
      }).delete();

      await trx.commit();

      console.log("[INFO] Colaborador removido do projeto com sucesso")

      return res.status(200).send();

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método removeCollaborator: " + err);
    }
  },

  async getNumberOfProjects(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de projetos do usuário");

      const col_id = req.query.user;

      const totalCountQuery = connection("PROJETOS")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
        .count("* as totalCount")
        .first();

      const { totalCount } = await totalCountQuery;

      return res.json({
        totalCount: totalCount,
      });
    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método getNumberOfProjects: " + err);
    }
  },

  async getNumberOfNewProjects(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de novos projetos do usuário");

      const col_id = req.query.user;

      const totalCountQuery = connection("PROJETOS")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
        .andWhereRaw("PROJETOS.PRO_DATA_INICIO >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)")
        .count("* as totalCount")
        .first();

      const { totalCount } = await totalCountQuery;

      return res.json({
        totalCount: totalCount,
      });

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método getNumberOfNewProjects: " + err);
    }
  },

  async getNumberOfOngoingProjects(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de projetos em andamento do usuário");

      const col_id = req.query.user;

      const totalCountQuery = connection("PROJETOS")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
        .andWhere("PROJETOS.PRO_STATUS", "EM ANDAMENTO")
        .count("* as totalCount")
        .first();

      const { totalCount } = await totalCountQuery;

      return res.json({
        totalCount: totalCount,
      });

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método getNumberOfOngoingProjects: " + err);
    }
  },

  async getNumberOfDoneProjects(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando contagem de projetos concluídos do usuário");

      const col_id = req.query.user;

      const totalCountQuery = connection("PROJETOS")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
        .andWhere("PROJETOS.PRO_STATUS", "FINALIZADO")
        .count("* as totalCount")
        .first();

      const { totalCount } = await totalCountQuery;

      return res.json({
        totalCount: totalCount,
      });

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método getNumberOfDoneProjects: " + err);
    }
  },

  async getProjetosRecentesColaborador(req, res){
    try {
      console.log("");
      console.log("[INFO] Iniciando listagem dos três projetos mais recentes do colaborador");

      const col_id = req.query.user;

      const projects = await connection("PROJETOS")
        .select("*")
        .join(
          "COLABORADORES_PROJETOS",
          "PROJETOS.PRO_ID",
          "=",
          "COLABORADORES_PROJETOS.FK_PROJETOS_PRO_ID"
        )
        .where("COLABORADORES_PROJETOS.FK_COLABORADORES_COL_ID", col_id)
        .orderBy("PROJETOS.PRO_DATA_INICIO", "desc")
        .limit(3);

      const serializedItems = projects.map((item) => {
        return {
          id: item.PRO_ID,
          nome: item.PRO_NOME,
          descricao: item.PRO_DESCRICAO,
          empresa: item.PRO_EMPRESA,
          dataInicio: item.PRO_DATA_INICIO.toLocaleDateString(),
          previsaoFim: item.PRO_PREVISAO_FIM.toLocaleDateString(),
          status: item.PRO_STATUS,
        };
      });

      return res.json(serializedItems);

    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método getTresProjetosMaisRecentesColaborador: " + err);
    }
  }
};

function validateProjectFields(nome, descricao, empresa, dataInicio, previsaoFim, status, res) {
  console.log("[INFO] Verificando campos do projeto");
  if (!nome || !descricao || !empresa || !dataInicio || !previsaoFim || !status) {
    return res.status(400).json({ error: "Campos obrigatórios não informados" });
  }

  const isValidNome = nome.length >= 5 && nome.length <= 100;
  const isValidDescricao = descricao.length >= 5 && descricao.length <= 255;
  const isValidEmpresa = empresa.length >= 5 && empresa.length <= 100;
  const isValidDataInicio = dataInicio.length === 10;
  const isValidPrevisaoFim = previsaoFim.length === 10;
  const isValidStatus = status.length >= 5 && status.length <= 100;

  if (!isValidNome) {
    return res.status(400).json({ error: "Nome inválido" });
  }

  if (!isValidDescricao) {
    return res.status(400).json({ error: "Descrição inválida" });
  }

  if (!isValidEmpresa) {
    return res.status(400).json({ error: "Empresa inválida" });
  }

  if (!isValidDataInicio) {
    return res.status(400).json({ error: "Data de início inválida" });
  }

  if (!isValidPrevisaoFim) {
    return res.status(400).json({ error: "Previsão de fim inválida" });
  }

  if (!isValidStatus) {
    return res.status(400).json({ error: "Status inválido" });
  }
}
