import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './containers/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RoleSelectionComponent } from './pages/role-selection/role-selection.component';
import { CollaboratorSigninComponent } from './pages/collaborator-signin/collaborator-signin.component';
import { StakeholderSigninComponent } from './pages/stakeholder-signin/stakeholder-signin.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [AuthComponent, HomeComponent, HeaderComponent, FooterComponent, RoleSelectionComponent, CollaboratorSigninComponent, StakeholderSigninComponent, SignupComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
