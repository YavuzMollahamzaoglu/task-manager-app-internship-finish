import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/pages/login/login.component';
import { MainPageComponent } from './app/pages/main-page/main-page.component';
import { CreateTaskComponent } from './app/pages/create-task/create-task.component';
import { RegistrationComponent } from './app/pages/registration/registration.component';
import { ProfileComponent } from './app/pages/profile/profile.component';
import { SettingsComponent } from './app/pages/settings/settings.component';
import { NotificationComponent } from './app/pages/notification/notification.component';
import { TeamsComponent } from './app/pages/teams/teams.component';
import { BoardComponent } from './app/pages/board/board.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'board', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
