import connection from "../database/databaseConnection.js";

export const EstimativaController = {

    async create(req, res) {
        try {
          console.log("");
          console.log("[INFO] Iniciando cadastro de Estimativa");
      
          const pro_id = req.query.projeto;

          const Tfactor = await getTfactor(pro_id);
          const Efactor = await getEfactor(pro_id);
      
          const totalSimples = await getTotalCasosSimples(pro_id);
          const totalMedios = await getTotalCasosMedios(pro_id);
          const totalComplexos = await getTotalCasosComplexos(pro_id);
      
          const soma =
            totalSimples * 5 + totalMedios * 10 + totalComplexos * 15;
      
          const totalSimplesA = await getTotalAtoresSimples(pro_id);
          const totalMediosA = await getTotalAtoresMedios(pro_id);
          const totalComplexosA = await getTotalAtoresComplexos(pro_id);
      
          const somaA =
            totalSimplesA * 1 + totalMediosA * 2 + totalComplexosA * 3;

          const PesoCaso = soma;
          const PesoAtor = somaA;

          const PesoPontos = soma + somaA;
          const ResPontos = (soma + somaA) * Tfactor * Efactor;
          const ResHoras = (soma + somaA) * Tfactor * Efactor * 20;

          const options = {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          };
          
          const date = new Date();
          
          const dataHoraFormatada = date.toLocaleString('pt-BR', options);

          console.log("[INFO] Iniciando inserção da estimativa no banco de dados");
          const est = await connection("ESTIMATIVAS_ESFORCOS")
            .select("*")
            .where("FK_PROJETOS_PRO_ID", pro_id)
            .first();

          await connection("ESTIMATIVAS_ESFORCOS").insert({
            EST_DATA_ESTIMATIVA: dataHoraFormatada,
            EST_EFACTOR: Efactor,
            EST_TFACTOR: Tfactor,
            EST_PESO_CASOS_USO: PesoCaso,
            EST_PESO_ATORES: PesoAtor,
            EST_PESO_PONTOS_CASOS_USO: PesoPontos,
            EST_RESULTADO_PONTOS_CASOS_USO: ResPontos,
            EST_RESULTADO_HORAS: ResHoras,
            FK_PROJETOS_PRO_ID: pro_id,
          });

          console.log("[INFO] Estimativa cadastrada com sucesso");
      
          return res.status(201).send();
      
        } catch (err) {
          console.log("[ERROR] [EstimativaController] Erro no método create: " + err);
          res.status(500).send("Erro ao criar a estimativa.");
        }
      },
      

    async list(req, res) {
        try {
          console.log("");
          console.log(
            "[INFO] Iniciando listagem de estimativa do Projeto"
          );
          const pro_id = req.query.projeto;
    
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
                DataEstimativa: est.EST_DATA_ESTIMATIVA,
                Efactor: est.EST_EFACTOR,
                Tfactor: est.EST_TFACTOR,
                PesoCaso: est.EST_PESO_CASOS_USO,
                PesoAtor: est.EST_PESO_ATORES,
                PesoPontos: est.EST_PESO_PONTOS_CASOS_USO,
                ResHoras: est.EST_RESULTADO_HORAS,
                ResPontos: est.EST_RESULTADO_PONTOS_CASOS_USO,
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

    }

async function getTfactor(pro_id) {
    const totalCountQuery = await connection("PROJETOS")
      .where("PRO_ID", pro_id)
      .select("PRO_RESTFACTOR")
      .first();
      return totalCountQuery.PRO_RESTFACTOR;
}

async function getEfactor(pro_id) {
  const totalCountQuery = await connection("PROJETOS")
    .where("PRO_ID", pro_id)
    .select("PRO_RESEFACTOR")
    .first();
    return totalCountQuery.PRO_RESEFACTOR;
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
      .join("REQUISITOS_FUNCIONAIS", "REQ_ID", "=", "CASOS_DE_USO.FK_REQUISITOS_FUNCIONAIS_REQ_ID")
      .join("PROJETOS", "PROJETOS.PRO_ID", "=", "REQUISITOS_FUNCIONAIS.FK_PROJETOS_PRO_ID")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("CAS_COMPLEXIDADE", "=", "SIMPLES")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }
  
  async function getTotalCasosMedios(pro_id) {
    const totalCountQuery = await connection("CASOS_DE_USO")
      .join("REQUISITOS_FUNCIONAIS", "REQ_ID", "=", "CASOS_DE_USO.FK_REQUISITOS_FUNCIONAIS_REQ_ID")
      .join("PROJETOS", "PROJETOS.PRO_ID", "=", "REQUISITOS_FUNCIONAIS.FK_PROJETOS_PRO_ID")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("CAS_COMPLEXIDADE", "=", "MEDIO")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }
  
  async function getTotalCasosComplexos(pro_id) {
    const totalCountQuery = await connection("CASOS_DE_USO")
      .join("REQUISITOS_FUNCIONAIS", "REQ_ID", "=", "CASOS_DE_USO.FK_REQUISITOS_FUNCIONAIS_REQ_ID")
      .join("PROJETOS", "PROJETOS.PRO_ID", "=", "REQUISITOS_FUNCIONAIS.FK_PROJETOS_PRO_ID")
      .where("FK_PROJETOS_PRO_ID", pro_id)
      .andWhere("CAS_COMPLEXIDADE", "=", "COMPLEXO")
      .count("* as totalCount")
      .first();
  
    return totalCountQuery.totalCount;
  }