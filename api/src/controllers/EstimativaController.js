import connection from "../database/databaseConnection.js";

export const EstimativaController = {

    async create(req, res) {
      try {
        console.log("");
        console.log("[INFO] Iniciando cadastro de Estimativa");
  
        const { Efactor, Tfactor, PesoCaso, PesoAtor, PesoPontos, ResHoras, ResPontos} = req.body;
  
        const pro_id = req.query.projeto;
  
        console.log(
          "[INFO] Iniciando inserção da estimativa no banco de dados"
        );

          await connection("ESTIMATIVAS_ESFORCOS").insert({
            EST_EFACTOR: Efactor,
            EST_TFACTOR: Tfactor,
            EST_PESO_CASOS_USO: PesoCaso,
            EST_PESO_ATORES: PesoAtor,
            EST_PESO_PONTOS_CASOS_USO: PesoPontos,
            EST_RESULTADO_HORAS: ResHoras,
            EST_RESULTADO_PONTOS_CASOS_USO: ResPontos,
            FK_PROJETOS_PRO_ID: pro_id,
          });
  
          console.log("[INFO] Estimativa cadastrada com sucesso");
  
          return res.status(201).send();
        
      } catch (err) {
        console.log(
          "[ERROR] [EstimativaController] Erro no método create: " + err
        );
      }
    },

    async list(req, res) {
        try {
          console.log("");
          console.log(
            "[INFO] Iniciando listagem de estimativa do Projeto"
          );
          const pro_id = req.query.projeto;
          console.log(pro_id);
    
          const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
          const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10
    
          const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página
    
          const est = await connection("ESTIMATIVAS_ESFORCOS")
            .select("*")
            .where("FK_PROJETOS_PRO_ID", pro_id)
            .offset(offset) // Aplica o deslocamento
            .limit(pageSize); // Limita o número de resultados por página
    
          const serializedItems = est.map((est) => {
            return {
                efactor: est.EST_EFACTOR,
                tfactor: est.EST_TFACTOR,
                pesoCaso: est.EST_PESO_CASOS_USO,
                pesoAtor: est.EST_PESO_ATORES,
                pesoPontos: est.EST_PESO_PONTOS_CASOS_USO,
                resHoras: est.EST_RESULTADO_HORAS,
                resPontos: est.EST_RESULTADO_PONTOS_CASOS_USO,
                id: est.EST_ID
            };
          });
    
          //ADQUIRINDO TOTAL DE REGISTROS
          const totalCountQuery = await connection("ESTIMATIVAS_ESFORCOS")
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
            "[ERROR] [EstimativaController] Erro no método list: " + error
          );
        }
      },

      async getTotalAtoresPonderados(req, res) {
        try {
          console.log("");
          console.log("[INFO] Iniciando cálculo da soma ponderada de atores");
    
          const pro_id = req.query.projeto;
    
          const totalSimples = await getTotalAtoresSimples(pro_id);
          const totalMedios = await getTotalAtoresMedios(pro_id);
          const totalComplexos = await getTotalAtoresComplexos(pro_id);
    
          const somaPonderada =
            totalSimples * 1 + totalMedios * 2 + totalComplexos * 3;
    
            console.log(somaPonderada);
    
            await connection("ESTIMATIVAS_ESFORCOS").update({
              EST_PESO_ATORES: somaPonderada }).where("PRO_ID", pro_id);
    
          return res.json({
            totalSimples,
            totalMedios,
            totalComplexos,
            somaPonderada,
          });
          
        } catch (err) {
          console.log(
            "[ERROR] [EstimativaController] Erro no método getTotalAtoresPonderados: " + err
          );
          return res.status(500).json({ error: "Internal Server Error" });
        }
      },

      async getTotalCasosPonderados(req, res) {
        try {
          console.log("");
          console.log("[INFO] Iniciando cálculo da soma ponderada dos casos");
    
          const pro_id = req.query.projeto;
    
          const totalSimples = await getTotalCasosSimples(pro_id);
          const totalMedios = await getTotalCasosMedios(pro_id);
          const totalComplexos = await getTotalCasosComplexos(pro_id);
    
          const somaPonderada =
            totalSimples * 1 + totalMedios * 2 + totalComplexos * 3;
    
            await connection("ESTIMATIVAS_ESFORCOS").update({
              EST_PESO_CASOS_USO: somaPonderada }).where("PRO_ID", pro_id);
    
          return res.json({
            totalSimples,
            totalMedios,
            totalComplexos,
            somaPonderada,
          });
        } catch (err) {
          console.log(
            "[ERROR] [EstimativaController] Erro no método getTotalAtoresPonderados: " + err
          );
          return res.status(500).json({ error: "Internal Server Error" });
        }
      },

}

async function getTotalAtoresSimples(pro_id) {
    const totalCountQuery = await connection("ATORES")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("ATO_COMPLEXIDADE", "=", "SIMPLES")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }
  
  async function getTotalAtoresMedios(pro_id) {
    const totalCountQuery = await connection("ATORES")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("ATO_COMPLEXIDADE", "=", "MEDIO")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }
  
  async function getTotalAtoresComplexos(pro_id) {
    const totalCountQuery = await connection("ATORES")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("ATO_COMPLEXIDADE", "=", "COMPLEXO")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }

  async function getTotalCasosSimples(pro_id) {
    const totalCountQuery = await connection("CASOS_DE_USO")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("CAS_COMPLEXIDADE", "=", "SIMPLES")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }
  
  async function getTotalCasosMedios(pro_id) {
    const totalCountQuery = await connection("CASOS_DE_USO")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("CAS_COMPLEXIDADE", "=", "MEDIO")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }
  
  async function getTotalCasosComplexos(pro_id) {
    const totalCountQuery = await connection("CASOS_DE_USO")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("CAS_COMPLEXIDADE", "=", "COMPLEXO")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }