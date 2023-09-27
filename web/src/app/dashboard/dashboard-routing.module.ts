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
      { path: 'atores', component: AtoresComponent},
      { path: 'inserir-atores', component: InserirAtoresComponent},
      { path: 'editar-atores', component: EditarAtoresComponent},
      { path: 'caso-de-uso', component: CasoDeUsoComponent},
      { path: 'inserir-caso', component: InserirCasoComponent},
      { path: 'editar-caso', component: EditarCasoComponent},
      { path: 'cenarios', component: CenariosComponent},
      { path: 'inserir-cenarios', component: InserirCenariosComponent},
      { path: 'editar-cenarios', component: EditarCenariosComponent},
      { path: 'fatores-tecnicos', component: FatoresTecnicosComponent},
      { path: 'editar-fator-tecnico', component: EditarFatorTecnicoComponent},
      { path: 'fatores-ambientais', component: FatoresAmbientaisComponent},
      { path: 'editar-fator-ambiental', component: EditarFatorAmbientalComponent},
      { path: 'estimativa', component: EstimativaComponent},
      { path: 'inserir-estimativa', component: InserirEstimativaComponent},

      // Comum
      { path: 'inserir-projeto/:id', component: InserirProjetoComponent },
      { path: 'editar-projeto/:id', component: EditarProjetoComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
