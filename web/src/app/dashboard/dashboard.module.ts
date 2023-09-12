import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { DashboardComponent } from './containers/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarItemComponent } from './shared/sidebar-item/sidebar-item.component';

@NgModule({
  declarations: [ProjetosComponent, DashboardComponent, SidebarComponent, HeaderComponent, FooterComponent, SidebarItemComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
