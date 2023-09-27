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

      const project = await connection("PROJETOS")
        .select("*")
        .where("PRO_ID", project_id)
        .first();

      const serializedItems = {
        id: project.PRO_ID,
        nome: project.PRO_NOME,
        descricao: project.PRO_DESCRICAO,
        empresa: project.PRO_EMPRESA,
        dataInicio: project.PRO_DATA_INICIO.toLocaleDateString(),
        previsaoFim: project.PRO_PREVISAO_FIM.toLocaleDateString(),
        status: project.PRO_STATUS,
      };

      return res.json(serializedItems);
    } catch (err) {
      console.log("[ERROR] [ProjetoController] Erro no método getById: " + err);
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
