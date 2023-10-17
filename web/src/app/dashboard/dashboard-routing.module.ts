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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'projetos', pathMatch: 'full' },
      {
        path: 'projetos',
        component: ProjetosComponent,
      },
      { path: 'atores/:id', component: AtoresComponent},
      { path: 'inserir-atores', component: InserirAtoresComponent},
      { path: 'editar-atores/:id', component: EditarAtoresComponent},
      { path: 'caso-de-uso/:id', component: CasoDeUsoComponent},
      { path: 'inserir-caso', component: InserirCasoComponent},
      { path: 'editar-caso/:id', component: EditarCasoComponent},
      { path: 'cenarios/:id', component: CenariosComponent},
      { path: 'inserir-cenarios', component: InserirCenariosComponent},
      { path: 'editar-cenarios/:id', component: EditarCenariosComponent},
      { path: 'fatores-tecnicos', component: FatoresTecnicosComponent},
      { path: 'editar-fator-tecnico/:id', component: EditarFatorTecnicoComponent},
      { path: 'fatores-ambientais', component: FatoresAmbientaisComponent},
      { path: 'editar-fator-ambiental/:id', component: EditarFatorAmbientalComponent},
      { path: 'estimativa', component: EstimativaComponent},
      { path: 'inserir-estimativa', component: InserirEstimativaComponent},

      // Projeto
      { path: 'inserir-projeto/:id', component: InserirProjetoComponent },
      { path: 'editar-projeto/:id', component: EditarProjetoComponent },
      { path: 'projeto/:id', component: ProjetoComponent },

      // Colaboradores Projeto
      { path: 'projeto/:id/colaboradores', component: ColaboradoresProjetoComponent },
      { path: 'projeto/:id/inserir-colaborador', component: InserirColaboradorProjetoComponent},

      // Requisitos Projeto
      { path: 'projeto/:id/requisitos', component: RequisitosProjetoComponent },
      { path: 'projeto/:id/inserir-requisito', component: InserirRequisitoComponent},
      { path: 'projeto/:id/editar-requisito/:idReq', component: EditarRequisitoComponent},

      // Painel Prioreasy
      { path: 'projeto/:id/painel-prioreasy', component: PainelPrioreasyComponent },

      // Prioreasy - Stakeholders
      { path: 'projeto/:id/stakeholders', component: StakeholdersProjetoComponent },
      { path: 'projeto/:id/inserir-stakeholder', component: InserirStakeholderComponent},

      // Stakeholders
      { path: 'painel-stakeholder', component: PainelStakeholderComponent},
      { path: 'priorizacao-stakeholder/:id', component: PriorizarRequisitosComponent},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
