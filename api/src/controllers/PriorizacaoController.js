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

  async insertResultadoPriorizacao(req, res){
    try {
      console.log("");
      console.log("[INFO] Iniciando inserção de classificação final do requisito");
      const req_id = req.query.requisito;
      const resultadoFinal = req.query.resultadoFinal;

      console.log(
        "[INFO] Iniciando inserção da classificação final do requisito no banco de dados"
      );

      await connection("RESULTADOS_REQUISITOS")
        .where({FK_REQUISITOS_FUNCIONAIS_REQ_ID: req_id})
        .update({RPR_RESULTADO_FINAL: resultadoFinal});

      console.log("[INFO] Classificação final do requisito inserida com sucesso");

      return res.status(201).send();
    } catch (err) {
      console.log(
        "[ERROR] [RequisitoController] Erro no método insertRequirementFinalClassification: " +
          err
      );
    }
  }
};
