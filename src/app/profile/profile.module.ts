import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxMaskModule } from 'ngx-mask';
import { ProfileRoutingModule } from './profile-routing.module';
import { AccountComponent } from './account/account.component';
import { PersonalComponent } from './personal/personal.component';
import { CommercialComponent } from './commercial/commercial.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [AccountComponent, PersonalComponent, CommercialComponent, SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxMaskModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
