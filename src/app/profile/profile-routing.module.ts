import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { PersonalComponent } from './personal/personal.component';
import { CommercialComponent } from './commercial/commercial.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'commercial', component: CommercialComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
