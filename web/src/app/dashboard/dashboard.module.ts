import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { DashboardComponent } from './containers/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarItemComponent } from './shared/sidebar-item/sidebar-item.component';
import { TabelaComponent } from './shared/tabela/tabela.component';
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

@NgModule({
  declarations: [ProjetosComponent, DashboardComponent, SidebarComponent, HeaderComponent, FooterComponent, SidebarItemComponent, TabelaComponent, AtoresComponent, InserirAtoresComponent, EditarAtoresComponent, CasoDeUsoComponent, EditarCasoComponent, InserirCasoComponent, CenariosComponent, InserirCenariosComponent, EditarCenariosComponent, FatoresTecnicosComponent, EditarFatorTecnicoComponent, FatoresAmbientaisComponent, EditarFatorAmbientalComponent, EstimativaComponent, InserirEstimativaComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
