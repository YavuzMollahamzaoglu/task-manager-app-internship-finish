import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/pages/login/login.component';
import { MainPageComponent } from './app/pages/main-page/main-page.component';
import { RegistrationComponent } from './app/pages/registration/registration.component';
import { ProfileComponent } from './app/pages/profile/profile.component';

import { BoardComponent } from './app/pages/board/board.component';
import { InfoComponent } from './app/pages/info/info.component';
import { CreateTeamComponent } from './app/pages/create-team/create-team.component';
import { LogoutComponent } from './app/pages/logout/logout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'board', component: BoardComponent },
  { path: 'info', component: InfoComponent },
  { path: 'team', component: CreateTeamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
