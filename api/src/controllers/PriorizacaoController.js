import connection from "../database/databaseConnection.js";

export const PriorizacaoController = {
  async insertPriorizacaoStakeholder(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando inserção de priorização de stakeholder");

      const {
        requisito,
        respostaPositiva,
        respostaNegativa,
        classificacaoRequisito,
      } = req.body;

      const sta_id = req.query.stakeholder;

      console.log(
        "[INFO] Iniciando inserção da priorização de stakeholder no banco de dados"
      );

      await connection("PRIORIZACAO_STAKEHOLDERS").insert({
        PRS_RESPOSTA_POSITIVA: respostaPositiva,
        PRS_RESPOSTA_NEGATIVA: respostaNegativa,
        PRS_CLASSIFICACAO_REQUISITO: classificacaoRequisito,
        FK_REQUISITOS_FUNCIONAIS_REQ_ID: requisito,
        FK_STAKEHOLDERS_STA_ID: sta_id,
      });

      console.log("[INFO] Priorização de stakeholder cadastrada com sucesso");

      return res.status(201).send();
    } catch (err) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método inserirPriorizacaoStakeholder: " +
          err
      );
    }
  },

  async completePriorizacaoStakeholder(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando inserção de participação de stakeholder");

      const id = req.query.stakeholder;

      await connection("STATUS_PRIORIZACAO")
        .where("FK_STAKEHOLDERS_STA_ID", id)
        .update({
          SPA_PARTICIPACAO_REALIZADA: 1,
        });

      res.status(200).send({
        message: "Participação de stakeholder inserida com sucesso!",
      });
    } catch (err) {
      console.log(
        "[ERROR] [StakeholderController] Erro no método completeStakeholderParticipation: " +
          err
      );
    }
  },

  async insertResultadoPriorizacao(req, res) {
    try {
      console.log("");
      console.log(
        "[INFO] Iniciando inserção de classificação final do requisito"
      );
      const req_id = req.query.requisito;
      const resultadoFinal = req.query.resultadoFinal;

      console.log(
        "[INFO] Iniciando inserção da classificação final do requisito no banco de dados"
      );

      await connection("RESULTADOS_REQUISITOS")
        .insert({
          RPR_RESULTADO_FINAL: resultadoFinal,
          FK_REQUISITOS_FUNCIONAIS_REQ_ID: req_id
        })

      console.log(
        "[INFO] Classificação final do requisito inserida com sucesso"
      );

      return res.status(201).send();
    } catch (err) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método insertRequirementFinalClassification: " +
          err
      );
    }
  },

  async getMostFrequentClassification(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de classificação mais frequente");

      const req_id = req.query.requisito;

      console.log(
        "[INFO] Iniciando busca da classificação mais frequente no banco de dados"
      );

      const mostFrequentClassification = await connection("PRIORIZACAO_STAKEHOLDERS")
        .where({ FK_REQUISITOS_FUNCIONAIS_REQ_ID: req_id })
        .select("PRS_CLASSIFICACAO_REQUISITO")
        .count("PRS_CLASSIFICACAO_REQUISITO as count")
        .groupBy("PRS_CLASSIFICACAO_REQUISITO")
        .orderBy("count", "desc")
        .limit(1);

      console.log(
        "[INFO] Classificação mais frequente encontrada com sucesso"
      );

      return res.status(200).send(mostFrequentClassification);
    } catch (err) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método getMostFrequentClassification: " +
          err
      );
    }
  }
};
