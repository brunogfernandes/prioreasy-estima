import connection from "../database/databaseConnection.js";

export const FatTecController = {
  
      async listByDescricao(req, res) {
        try {
          console.log("");
          console.log("[INFO] Iniciando listagem de fatores tecnico");

          const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
          const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10.
    
          const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página
    
          // PESQUISA COM PAGINAÇÃO
          const fator = await connection("FATORES_TECNICOS")
            .select("*")
            .offset(offset) // Aplica o deslocamento
            .limit(pageSize); // Limita o número de resultados por página
    
          const serializedItems = fator.map((item) => {
            return {
              id: item.TEC_ID,
              descricao: item.TEC_DESCRICAO,
              peso: item.TEC_PESO,
            };
          });
    
          // ADQUIRINDO TOTAL DE REGISTROS
          const totalCountQuery = connection("FATORES_TECNICOS")
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
            "[ERROR] [FatTecController] Erro no método listByDescrição: " + err
          );
        }
      },

      async listById (req, res) {

        try {
            console.log("");
            console.log("[INFO] Iniciando listagem de fatores tecnicos");
  
            const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
            const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10.
      
            const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página
      
            // PESQUISA COM PAGINAÇÃO
            const fator = await connection("FATORES_TECNICOS_PROJETOS")
              .select("*")
              .offset(offset) // Aplica o deslocamento
              .limit(pageSize); // Limita o número de resultados por página
      
            const serializedItems = fator.map((item) => {
              return {
                id: item.TEP_ID,
                valor: item.TEP_VALOR,
                fator: item.FK_FATORES_TECNICOS_TEC_ID,
              };
            });
      
            // ADQUIRINDO TOTAL DE REGISTROS
            const totalCountQuery = connection("FATORES_TECNICOS")
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
              "[ERROR] [FatTecController] Erro no método listById: " + err
            );
          }

      },

      async getById(req, res) {
        try {
          console.log("");
          console.log("[INFO] Iniciando busca de Fatores por id");
    
          const fat_id = req.query.fator;

          const fat = await connection("FATORES_TECNICOS_PROJETOS")
            .select("*")
            .where("TEP_ID", fat_id)
            .first();
    
          const serializedItems = {
            id: fat.TEP_ID,
            valor: fat.TEP_VALOR,
          };
    
          return res.json(serializedItems);
        } catch (err) {
            console.log("[ERROR] [FatTecController] Erro no método getById: " + err);
        }
      },

      async update(req, res) {
        try {
            console.log("");
            console.log("[INFO] Iniciando atualização de fator tecnico no banco de dados")
      
            const {valor} = req.body;

            const fat_id = req.query.fator; // Arrumar isso aqui /////*****///////////****///////*** */ */ */
            console.log(fat_id);
            console.log(valor);
          
            console.log("[INFO] Iniciando atualização de fatores no banco de dados")
      
            if(!validateFatoresFields(valor, res)) {
      
              const trx = await connection.transaction();
      
              await trx("FATORES_TECNICOS_PROJETOS").where(
                "TEP_ID",
                fat_id
              ).update({
                TEP_VALOR: valor,
              });
      
              await trx.commit();
      
              console.log("[INFO] Fator Tecnico atualizado com sucesso")
      
              return res.status(200).send();
      
            }
      
          } catch (err) {
            console.log("[ERROR] [FatTecController] Erro no método update: " + err);
          }
      },  
};

function validateFatoresFields(valor, res) {

    console.log("[INFO] Verificando campos do fator tecnicos");
    
        if (!valor) {
          return res.status(400).json({ error: "Campos obrigatórios não informados" });
        }
  }