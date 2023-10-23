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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InserirProjetoComponent } from './pages/inserir-projeto/inserir-projeto.component';
import { EditarProjetoComponent } from './pages/editar-projeto/editar-projeto.component';
import { DialogoConfirmacaoComponent } from './shared/dialogo-confirmacao/dialogo-confirmacao.component';
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
import { DialogoMensagemComponent } from './shared/dialogo-mensagem/dialogo-mensagem.component';
import { InserirFatorTecnicoComponent } from './pages/inserir-fator-tecnico/inserir-fator-tecnico.component';
import { PainelEstimaComponent } from './pages/painel-estima/painel-estima.component';
import { InserirFatorAmbientalComponent } from './pages/inserir-fator-ambiental/inserir-fator-ambiental.component';

@NgModule({
  declarations: [ProjetosComponent, DashboardComponent, SidebarComponent, HeaderComponent, FooterComponent, SidebarItemComponent, TabelaComponent, AtoresComponent, InserirAtoresComponent, EditarAtoresComponent, CasoDeUsoComponent, EditarCasoComponent, InserirCasoComponent, CenariosComponent, InserirCenariosComponent, EditarCenariosComponent, FatoresTecnicosComponent, EditarFatorTecnicoComponent, FatoresAmbientaisComponent, EditarFatorAmbientalComponent, EstimativaComponent, InserirEstimativaComponent, InserirProjetoComponent, EditarProjetoComponent, DialogoConfirmacaoComponent, ProjetoComponent, ColaboradoresProjetoComponent, InserirColaboradorProjetoComponent, RequisitosProjetoComponent, InserirRequisitoComponent, EditarRequisitoComponent, PainelPrioreasyComponent, StakeholdersProjetoComponent, InserirStakeholderComponent, PainelStakeholderComponent, PriorizarRequisitosComponent, InserirFatorAmbientalComponent, InserirFatorTecnicoComponent, PainelEstimaComponent, DialogoMensagemComponent],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, ReactiveFormsModule],
})
export class DashboardModule {}
