import connection from "../database/databaseConnection.js";

export const ColaboradorController = {
  
  async listByName(req, res) {
    try {
      const name = req.query.name;
      const pro_id = req.query.projeto;

      const colaboradores = await connection("COLABORADORES")
        .select("*")
        .whereNotIn(
          "COL_ID",
          connection("COLABORADORES_PROJETOS").select("FK_COLABORADORES_COL_ID").where("FK_PROJETOS_PRO_ID", pro_id)
        )
        .andWhereLike("COL_NOME", `%${name}%`)
        .limit(10);

      const serializedItems = colaboradores.map((colaborador) => {
        return {
          id: colaborador.COL_ID,
          nome: colaborador.COL_NOME,
          email: colaborador.COL_EMAIL,
          empresa: colaborador.COL_EMPRESA,
          cargo: colaborador.COL_CARGO,
        };
      });

      return res.json(serializedItems);
    } catch (error) {
      console.log(error);
    }
  },

  async getById(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando busca de Colaborador por ID");

      const col_id = req.query.id;
      console.log(ato_id);

      console.log(
        "[INFO] Iniciando busca do Colaborador no banco de dados"
      );

      const Atores = await connection("COLABORADORES")
        .select("*")
        .where("COL_ID", col_id)
        .first();

      console.log("[INFO] Colaborador encontrado com sucesso");

      return res.json({
        id: Colaborar.COL_ID,
        nome: Colaborar.COL_NOME,
        email: colaborador.COL_EMAIL,
          empresa: colaborador.COL_EMPRESA,
          cargo: colaborador.COL_CARGO,
      });
    } catch (err) {
      console.log(
        "[ERROR] [AtoresController] Erro no método getById: " + err
      );
    }
  },

  
};
