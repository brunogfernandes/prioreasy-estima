import connection from "../database/databaseConnection.js";

export const FatAmbController = {
  
  async list(req, res) {
    try {
      console.log("");
      console.log(
        "[INFO] Iniciando listagem de Fatores Ambientais"
      );
      const pro_id = req.query.projeto;

      const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
      const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10

      const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página

      const fat = await connection("FATORES_AMBIENTAIS_PROJETOS")
        .select("*")
        .where("FK_PROJETOS_PRO_ID", pro_id)
        .offset(offset) // Aplica o deslocamento
        .limit(pageSize); // Limita o número de resultados por página

        const serializedItems = await Promise.all(fat.map(async (fat) => {
          const factorDescription = await connection("FATORES_AMBIENTAIS")
            .select("AMB_DESCRICAO", "AMB_PESO")
            .where("AMB_ID", fat.FK_FATORES_AMBIENTAIS_AMB_ID)
            .first();
    
          return {
            descricao: factorDescription ? factorDescription.AMB_DESCRICAO : "Descrição não encontrada",
            peso: factorDescription ? factorDescription.AMB_PESO : "Peso não encontrada",
            valor: fat.AMP_VALOR,
            id: fat.AMP_ID,
          };
        }));

      //ADQUIRINDO TOTAL DE REGISTROS
      const totalCountQuery = await connection("FATORES_AMBIENTAIS_PROJETOS")
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
      }, 0) * -0.3) + 1.4;

      await connection("PROJETOS").update({
        PRO_RESEFACTOR: totalValue }).where("PRO_ID", pro_id);

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
        "[ERROR] [FatAmbController] Erro no método list: " + error
      );
    }
  },

  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de Fator Ambiental");

      const { valor, fatorAmb } = req.body;
      console.log(valor,fatorAmb);

      const pro_id = req.query.projeto;
      console.log(pro_id);

      console.log(
        "[INFO] Iniciando inserção do Fator Ambiental no banco de dados"
      );

      await connection("FATORES_AMBIENTAIS_PROJETOS").insert({
        AMP_VALOR: valor,
        FK_FATORES_AMBIENTAIS_AMB_ID: fatorAmb,
        FK_PROJETOS_PRO_ID: pro_id,
      });

      console.log("[INFO] Fator Ambiente cadastrado com sucesso");

      return res.status(201).send();

    } catch (err) {
      console.log(
        "[ERROR] [FatorAmbienteController] Erro no método create: " + err
      );
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de Fatores Ambientais por ID");

      const amp_id = req.query.fator;

      console.log(
        "[INFO] Iniciando busca do Fatores Ambientais no banco de dados"
      );

      const Fator = await connection("FATORES_AMBIENTAIS_PROJETOS")
        .select("*")
        .where("AMP_ID", amp_id)
        .first();

      console.log("[INFO] Fator Ambiente encontrado com sucesso");

      return res.json({
        id: Fator.AMP_ID,
        valor: Fator.AMP_VALOR,
      });
    } catch (err) {
      console.log(
        "[ERROR] [FatAmbController] Erro no método getById: " + err
      );
    }
  },

  async update(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de Fatores Ambientais");

      const { valor} = req.body;

      const fat_id = req.query.fatores;
      console.log(fat_id);

      console.log(
        "[INFO] Iniciando atualização do Fator Ambiental no banco de dados"
      );

      await connection("FATORES_AMBIENTAIS_PROJETOS")
          .where({ AMP_ID: fat_id })
          .update({
            AMP_VALOR: valor,
          });

        console.log("[INFO] Fator Ambiental atualizado com sucesso");

        return res.status(200).send();

    } catch (err) {
      console.log(
        "[ERROR] [fatAmbController] Erro no método update: " + err
      );
    }
  },

  async delete(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando exclusão de Fator Ambiental");

      const fator_id = req.query.idFat;
      console.log(fator_id);

      console.log(
        "[INFO] Iniciando exclusão do Fator Ambiental no banco de dados"
      );

      await connection("FATORES_AMBIENTAIS_PROJETOS").where({ AMP_ID: fator_id }).del();

      console.log("[INFO] Fator Ambiental excluído com sucesso");

      return res.status(200).send();
    } catch (err) {
      console.log(
        "[ERROR] [FatAmbController] Erro no método delete: " + err
      );
    }
  },

};
