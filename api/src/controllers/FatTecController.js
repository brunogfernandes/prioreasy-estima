import connection from "../database/databaseConnection.js";

export const FatTecController = {
  
  async list(req, res) {
    try {
      console.log("");
      console.log(
        "[INFO] Iniciando listagem de Fatores Tecnicos"
      );
      const pro_id = req.query.projeto;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const fat = await connection("FATORES_TECNICOS_PROJETOS")
        .select("*")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

        const serializedItems = await Promise.all(fat.map(async (fat) => {
          const factorDescription = await connection("FATORES_TECNICOS")
            .select("TEC_DESCRICAO", "TEC_PESO")
            .where("TEC_ID", fat.FK_FATORES_TECNICOS_TEC_ID)
            .first();

          return {
            descricao: factorDescription ? factorDescription.TEC_DESCRICAO : "Descrição não encontrada",
            peso: factorDescription ? factorDescription.TEC_PESO : "Peso não encontrada",
            valor: fat.TEP_VALOR,
            id: fat.TEP_ID,
          };
        }));

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("FATORES_TECNICOS_PROJETOS")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .count("* as totalCount")
        .first();

      const { totalCount } = await totalCountQuery;

      // CALCULANDO TOTAL DE PÁGINAS
      const totalPages = Math.ceil(totalCount / pageSize);

      const totalValue = (serializedItems.reduce((total, item) => {
        if (typeof item.peso === 'number') {
          total += (item.valor * item.peso);
        }
        return total;
      }, 0) * 0.1) + 0.6;

      await connection("PROJETOS").update({
        PRO_RESTFACTOR: totalValue }).where("PRO_ID", pro_id);

      console.log(totalValue);

      return res.json({
        items: serializedItems,
        page: {
          size: pageSize,
          totalElements: totalCount,
          totalPages: totalPages,
          number: page,
        },
        totalValue: totalValue,
      });
    } catch (error) {
      console.log(
        "[ERROR] [FatTecController] Erro no método list: " + error
      );
    }
  },

  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de Fator Tecnico");

      const { valor, fatorTec } = req.body;
      console.log(valor,fatorTec);

      const pro_id = req.query.projeto;
      console.log(pro_id);

      console.log(
        "[INFO] Iniciando inserção do Fator Tecnico no banco de dados"
      );

      await connection("FATORES_TECNICOS_PROJETOS").insert({
        TEP_VALOR: valor,
        FK_FATORES_TECNICOS_TEC_ID: fatorTec,
        FK_PROJETOS_PRO_ID: pro_id,
      });

      console.log("[INFO] Fator Tecnicos cadastrado com sucesso");

      return res.status(201).send();

    } catch (err) {
      console.log(
        "[ERROR] [FatorTecController] Erro no método create: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de Fatores Tecnicos por ID");

      const amp_id = req.query.fator;

      console.log(
        "[INFO] Iniciando busca do Fatores Tecnicos no banco de dados"
      );

      const Fator = await connection("FATORES_TECNICOS_PROJETOS")
        .select("*")
        .where("TEP_ID", amp_id)
        .first();

      console.log("[INFO] Fator Tecnicos encontrado com sucesso");

      return res.json({
        id: Fator.TEP_ID,
        valor: Fator.TEP_VALOR,
      });
    } catch (err) {
      console.log(
        "[ERROR] [FatTecController] Erro no método getById: " + err
      );
    }
  },

  async update(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de Fatores Tecnicos");

      const { valor} = req.body;

      const fat_id = req.query.fatores;
      console.log(fat_id);

      console.log(
        "[INFO] Iniciando atualização do Fator Tecnicos no banco de dados"
      );

      await connection("FATORES_TECNICOS_PROJETOS")
          .where({ TEP_ID: fat_id })
          .update({
            TEP_VALOR: valor,
          });

        console.log("[INFO] Fator Tecnico atualizado com sucesso");

        return res.status(200).send();

    } catch (err) {
      console.log(
        "[ERROR] [fatTecController] Erro no método update: " + err
      );
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando exclusão de Fator Tecnico");

      const fator_id = req.query.idFat;
      console.log(fator_id);

      console.log(
        "[INFO] Iniciando exclusão do Fator Tecnico no banco de dados"
      );

      await connection("FATORES_TECNICOS_PROJETOS").where({ TEP_ID: fator_id }).del();

      console.log("[INFO] Fator Tecnico excluído com sucesso");

      return res.status(200).send();
    } catch (err) {
      console.log(
        "[ERROR] [FatTecController] Erro no método delete: " + err
      );
    }
  },
};
