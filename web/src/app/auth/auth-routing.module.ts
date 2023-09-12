import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './containers/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { RoleSelectionComponent } from './pages/role-selection/role-selection.component';
import { CollaboratorSigninComponent } from './pages/collaborator-signin/collaborator-signin.component';
import { StakeholderSigninComponent } from './pages/stakeholder-signin/stakeholder-signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'role-selection',
        component: RoleSelectionComponent
      },
      {
        path: 'collaborator-signin',
        component: CollaboratorSigninComponent
      },
      {
        path: 'stakeholder-signin',
        component: StakeholderSigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
