import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { AtoresComponent } from './pages/atores/atores.component';
import { InserirAtoresComponent } from './pages/inserir-atores/inserir-atores.component';
import { EditarAtoresComponent } from './pages/editar-atores/editar-atores.component';
import { CasoDeUsoComponent } from './pages/caso-de-uso/caso-de-uso.component';
import { EditarCasoComponent } from './pages/editar-caso/editar-caso.component';
import { InserirCasoComponent } from './pages/inserir-caso/inserir-caso.component';
import { CenariosComponent } from './pages/cenarios/cenarios.component';
import { InserirCenariosComponent } from './pages/inserir-cenarios/inserir-cenarios.component';
import { EditarCenariosComponent } from './pages/editar-cenarios/editar-cenarios.component';
import { FatoresTecnicosComponent } from './pages/fatores-tecnicos/fatores-tecnicos.component';
import { EditarFatorTecnicoComponent } from './pages/editar-fator-tecnico/editar-fator-tecnico.component';
import { FatoresAmbientaisComponent } from './pages/fatores-ambientais/fatores-ambientais.component';
import { EditarFatorAmbientalComponent } from './pages/editar-fator-ambiental/editar-fator-ambiental.component';
import { EstimativaComponent } from './pages/estimativa/estimativa.component';
import { InserirEstimativaComponent } from './pages/inserir-estimativa/inserir-estimativa.component';
import { InserirProjetoComponent } from './pages/inserir-projeto/inserir-projeto.component';
import { EditarProjetoComponent } from './pages/editar-projeto/editar-projeto.component';
import { ProjetoComponent } from './pages/projeto/projeto.component';
import { ColaboradoresProjetoComponent } from './pages/colaboradores-projeto/colaboradores-projeto.component';
import { InserirColaboradorProjetoComponent } from './pages/inserir-colaborador-projeto/inserir-colaborador-projeto.component';
import { RequisitosProjetoComponent } from './pages/requisitos-projeto/requisitos-projeto.component';
import { InserirRequisitoComponent } from './pages/inserir-requisito/inserir-requisito.component';
import { EditarRequisitoComponent } from './pages/editar-requisito/editar-requisito.component';
import { PainelPrioreasyComponent } from './pages/painel-prioreasy/painel-prioreasy.component';
import { StakeholdersProjetoComponent } from './pages/stakeholders-projeto/stakeholders-projeto.component';
import { InserirStakeholderComponent } from './pages/inserir-stakeholder/inserir-stakeholder.component';
import { PainelStakeholderComponent } from './pages/painel-stakeholder/painel-stakeholder.component';
import { PriorizarRequisitosComponent } from './pages/priorizar-requisitos/priorizar-requisitos.component';
import { colaboradorGuard, stakeholderGuard } from './guards/role.guard';
import { InserirFatorAmbientalComponent } from './pages/inserir-fator-ambiental/inserir-fator-ambiental.component';
import { InserirFatorTecnicoComponent } from './pages/inserir-fator-tecnico/inserir-fator-tecnico.component';
import { PainelEstimaComponent } from './pages/painel-estima/painel-estima.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'projetos', pathMatch: 'full' },
      {
        path: 'projetos',
        component: ProjetosComponent,
        canActivate: [colaboradorGuard]
      },
      { path: 'atores/:id', component: AtoresComponent, canActivate: [colaboradorGuard]},
      { path: 'inserir-atores', component: InserirAtoresComponent, canActivate: [colaboradorGuard]},
      { path: 'editar-atores/:id', component: EditarAtoresComponent, canActivate: [colaboradorGuard]},
      { path: 'caso-de-uso/:id', component: CasoDeUsoComponent, canActivate: [colaboradorGuard]},
      { path: 'inserir-caso', component: InserirCasoComponent, canActivate: [colaboradorGuard]},
      { path: 'editar-caso/:id', component: EditarCasoComponent, canActivate: [colaboradorGuard]},
      { path: 'cenarios/:id', component: CenariosComponent, canActivate: [colaboradorGuard]},
      { path: 'inserir-cenarios', component: InserirCenariosComponent, canActivate: [colaboradorGuard]},
      { path: 'editar-cenarios/:id', component: EditarCenariosComponent, canActivate: [colaboradorGuard]},
      { path: 'fatores-tecnicos', component: FatoresTecnicosComponent, canActivate: [colaboradorGuard]},
      { path: 'editar-fator-tecnico/:id', component: EditarFatorTecnicoComponent, canActivate: [colaboradorGuard]},
      { path: 'fatores-ambientais', component: FatoresAmbientaisComponent, canActivate: [colaboradorGuard]},
      { path: 'editar-fator-ambiental/:id', component: EditarFatorAmbientalComponent, canActivate: [colaboradorGuard]},
      { path: 'estimativa', component: EstimativaComponent, canActivate: [colaboradorGuard]},
      { path: 'inserir-estimativa', component: InserirEstimativaComponent, canActivate: [colaboradorGuard]},

      // Projeto
      { path: 'inserir-projeto/:id', component: InserirProjetoComponent, canActivate: [colaboradorGuard] },
      { path: 'editar-projeto/:id', component: EditarProjetoComponent, canActivate: [colaboradorGuard] },
      { path: 'projeto/:id', component: ProjetoComponent, canActivate: [colaboradorGuard] },

      // Colaboradores Projeto
      { path: 'projeto/:id/colaboradores', component: ColaboradoresProjetoComponent, canActivate: [colaboradorGuard] },
      { path: 'projeto/:id/inserir-colaborador', component: InserirColaboradorProjetoComponent, canActivate: [colaboradorGuard]},

      // Requisitos Projeto
      { path: 'projeto/:id/requisitos', component: RequisitosProjetoComponent, canActivate: [colaboradorGuard] },
      { path: 'projeto/:id/inserir-requisito', component: InserirRequisitoComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:id/editar-requisito/:idReq', component: EditarRequisitoComponent, canActivate: [colaboradorGuard]},

      // Painel Prioreasy
      { path: 'projeto/:id/painel-prioreasy', component: PainelPrioreasyComponent, canActivate: [colaboradorGuard] },

      // Prioreasy - Stakeholders
      { path: 'projeto/:id/stakeholders', component: StakeholdersProjetoComponent, canActivate: [colaboradorGuard] },
      { path: 'projeto/:id/inserir-stakeholder', component: InserirStakeholderComponent, canActivate: [colaboradorGuard]},

      // Stakeholders
      { path: 'painel-stakeholder', component: PainelStakeholderComponent, canActivate: [stakeholderGuard]},
      { path: 'priorizacao-stakeholder/:id', component: PriorizarRequisitosComponent, canActivate: [stakeholderGuard]},

      // Estima - Atores

      { path: 'projeto/:id/atores', component: AtoresComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:id/inserir-atores', component: InserirAtoresComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:id/editar-atores/:idAtor', component: EditarAtoresComponent, canActivate: [colaboradorGuard]},

      //Estima - Caso de Uso

      { path: 'projeto/:idPro/requisitos/:id/caso-de-uso', component: CasoDeUsoComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:idPro/requisitos/:id/inserir-caso', component: InserirCasoComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:idPro/requisitos/:id/editar-caso/:idCaso', component: EditarCasoComponent, canActivate: [colaboradorGuard]},

      //Estima - Cenários

      { path: 'projeto/:idPro/requisitos/:idReq/caso-de-uso/:id/cenarios', component: CenariosComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:idPro/requisitos/:idReq/caso-de-uso/:id/inserir-cenarios', component: InserirCenariosComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:idPro/requisitos/:idReq/caso-de-uso/:id/editar-cenarios/:idCen', component: EditarCenariosComponent, canActivate: [colaboradorGuard]},

      //Estima - Fatores Ambientais

      { path: 'projeto/:id/fatores-ambientais', component: FatoresAmbientaisComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:id/inserir-fator-ambiental', component: InserirFatorAmbientalComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:id/editar-fator-ambiental/:idfat', component: EditarFatorAmbientalComponent, canActivate: [colaboradorGuard]},

      //Estima - Fatores Técnicos

      { path: 'projeto/:id/fatores-tecnicos', component: FatoresTecnicosComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:id/inserir-fator-tecnico', component: InserirFatorTecnicoComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:id/editar-fator-tecnico/:idfat', component: EditarFatorTecnicoComponent, canActivate: [colaboradorGuard]},

      //Estima - Estimativa

      { path: 'projeto/:id/estimativa', component: EstimativaComponent, canActivate: [colaboradorGuard]},
      { path: 'projeto/:id/inserir-estimativa', component: InserirEstimativaComponent, canActivate: [colaboradorGuard]},

      //Estima - Painel Estimativa

        { path: 'projeto/:id/painel-estima', component: PainelEstimaComponent, canActivate: [colaboradorGuard]},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
