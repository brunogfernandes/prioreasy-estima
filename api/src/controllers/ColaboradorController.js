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
};
