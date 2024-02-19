import connection from "../database/databaseConnection.js";

export const TestController = {
    
    async create(req, res) {
        try {
            console.log("");
            console.log("[INFO] Iniciando cadastro de Teste");
    
            const { nome, numeroIdentificador,sprint, status, objetivo, entrada, saida, erro, responsavelNome, casoDeUso } = req.body;
    
            const pro_id = req.query.projeto;
    
            console.log("[INFO] Iniciando inserção do teste no banco de dados");
    
            await connection("TESTE").insert({
                TES_NOME: nome,
                TES_NUMERO_IDENTIFICADOR: numeroIdentificador,
                TES_SPRINT: sprint,
                TES_STATUS: status,
                TES_OBJETIVO: objetivo,
                TES_ENTRADA: entrada,
                TES_SAIDA: saida,
                TES_ERRO: erro,
                FK_COLABORADORES_COL_ID: responsavelNome, 
                FK_PROJETOS_PRO_ID: pro_id,
                FK_CASOS_DE_USO_CAS_ID: casoDeUso,
            });
    
            console.log("[INFO] Teste cadastrado com sucesso");
            console.log("Colaborador:" + responsavelNome)
            console.log("Caso de Uso:" + casoDeUso)
            console.log("Nome:" + nome)
    
            return res.status(201).send();
        } catch (err) {
            console.log("[ERROR] [TesteController] Erro no método create: " + err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },
    
    async update(req, res) {
        try {
            console.log("");
            console.log("[INFO] Iniciando atualização de Teste");
    
            const { nome, sprint, status, objetivo, entrada, saida, erro } = req.body;
    
            const pro_id = req.query.projeto;
            const cas_id = req.query.casoDeUso;
            const tes_id = req.query.teste;
    
            console.log("[INFO] Iniciando atualização do teste no banco de dados");
    
            await connection("TESTE")
                .where({ TES_ID: tes_id })
                .update({
                    TES_NOME: nome,
                    TES_SPRINT: sprint,
                    TES_STATUS: status,
                    TES_OBJETIVO: objetivo,
                    TES_ENTRADA: entrada,
                    TES_SAIDA: saida,
                    TES_ERRO: erro,
                    FK_COLABORADORES_COL_ID: req.user.id, // ou qualquer método para obter o ID do colaborador
                    FK_PROJETOS_PRO_ID: pro_id,
                    FK_CASOS_DE_USO_CAS_ID: cas_id,
                });
    
            console.log("[INFO] Teste atualizado com sucesso");
    
            return res.status(200).send();
        } catch (err) {
            console.log("[ERROR] [TesteController] Erro no método update: " + err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },
    
    async delete(req, res) {
        try {
            console.log("");
            console.log("[INFO] Iniciando exclusão de Teste");
    
            const tes_id = req.query.teste;
    
            console.log("[INFO] Iniciando exclusão do teste no banco de dados");
    
            await connection("TESTE").where({ TES_ID: tes_id }).del();
    
            console.log("[INFO] Teste excluído com sucesso");
    
            return res.status(200).send();
        } catch (err) {
            console.log("[ERROR] [TesteController] Erro no método delete: " + err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },
    
    async getById(req, res) {
        try {
            console.log("");
            console.log("[INFO] Iniciando busca de Teste por ID");
    
            const tes_id = req.query.id;
    
            console.log("[INFO] Iniciando busca do teste no banco de dados");
    
            const teste = await connection("TESTE")
                .select("*")
                .where("TES_ID", tes_id)
                .first();
    
            console.log("[INFO] Teste encontrado com sucesso");
    
            return res.json({
                id: teste.TES_ID,
                nome: teste.TES_NOME,
                sprint: teste.TES_SPRINT,
                status: teste.TES_STATUS,
                objetivo: teste.TES_OBJETIVO,
                entrada: teste.TES_ENTRADA,
                saida: teste.TES_SAIDA,
                erro: teste.TES_ERRO,
                responsavelNome: teste.FK_COLABORADORES_COL_ID,
                casoDeUso: teste.FK_CASOS_DE_USO_CAS_ID,
            });
        } catch (err) {
            console.log("[ERROR] [TesteController] Erro no método getById: " + err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },
    
    async list(req, res) {
        try {
            console.log("");
            console.log("[INFO] Iniciando listagem de Testes do Projeto");
            const pro_id = req.query.projeto;
    
            const page = parseInt(req.query.page, 10) || 0; // Página atual, padrão é 1
            const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamanho da página, padrão é 10
    
            const offset = page * pageSize; // Calcula o deslocamento com base na página atual e no tamanho da página
    
            const testes = await connection("TESTE")
                .select("*")
                .where("FK_PROJETOS_PRO_ID", pro_id)
                .offset(offset) // Aplica o deslocamento
                .limit(pageSize); // Limita o número de resultados por página
    
            const serializedItems = testes.map((teste) => {
                return {
                    id: teste.TES_ID,
                    numeroIdentificador: teste.TES_NUMERO_IDENTIFICADOR,
                    nome: teste.TES_NOME,
                    sprint: teste.TES_SPRINT,
                    status: teste.TES_STATUS,
                    objetivo: teste.TES_OBJETIVO,
                    entrada: teste.TES_ENTRADA,
                    saida: teste.TES_SAIDA,
                    erro: teste.TES_ERRO,
                };
            });
    
            //ADQUIRINDO TOTAL DE REGISTROS
            const totalCountQuery = await connection("TESTE")
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
            console.log("[ERROR] [TesteController] Erro no método list: " + error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    async addCollaborator(req, res) {
        try {
          console.log("");
          console.log("[INFO] Iniciando atribuição de Colaborador a um teste")
    
          const col_id = req.query.colaborador;
          const pro_id = req.query.projeto;
        
          console.log("[INFO] Iniciando atribuição de Colaborador a um teste")
    
          const trx = await connection.transaction();
    
          await trx("COLABORADORES_PROJETOS").insert({
            FK_COLABORADORES_COL_ID: col_id,
            FK_PROJETOS_PRO_ID: pro_id,
            COP_ADMINISTRADOR: false,
            COP_ATIVO: true,
          });
    
          await trx.commit();
    
          console.log("[INFO] Colaborador adicionado ao projeto com sucesso")
    
          return res.status(200).send();
    
        } catch (err) {
          console.log("[ERROR] [ProjetoController] Erro no método addCollaborator: " + err);
        }
      },
    
}