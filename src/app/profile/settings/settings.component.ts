import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { ProfileService } from '../profile.service';
import { Constants } from '../../utils/constants'
import { AuthService } from '../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { StorageUtils } from '../../utils/storage-utils';
import { Setting } from '../setting/setting';
import { User } from '../user/user';
import { Address } from '../address/address';
import { Info } from '../info/info';
import { UserReference } from '../userReference/userReference';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form: FormGroup;

  setting: Setting;

  constructor(private profileService: ProfileService,
              private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.setting = new Setting();

    this.form = this.fb.group({
      preferredLanguage: this.fb.control(this.setting.preferredLanguage, [Validators.required]),
      timeZone: this.fb.control(this.setting.timeZone, [Validators.required]),
      languages: this.fb.control(this.setting.languages, [Validators.required]),
    })



    this.loadSettings();
  }


  loadSettings() {

    const idUser = this.storage.getIdUser() ? this.storage.getIdUser() : null;

    this.profileService.loadSettings(idUser)
      .subscribe(settings => {
        console.log(settings);
        this.setting = settings['data'];
      })
  }

  saveSettings() {
    this.profileService.saveSettings(this.setting)
      .subscribe(response => {
        console.log(response);
        Swall('Sucesso', 'Informações salvas com sucesso', 'success');
      })
  }
/*

https://codepen.io/guuslieben/pen/YyPRVP

Load
http://127.0.0.1:8080/MBNWs/rs/settings/load/cc493975-9a0e-495a-8530-66c59e8b795d

ou esse

http://127.0.0.1:8080/MBNWs/rs/settings/loadByIdUser/cc493975-9a0e-495a-8530-66c59e8b795d

Save
  {
      "id": "10372cad-6546-4b5b-a89c-fa33dd6d8e30",
      "idUser": "cc493975-9a0e-495a-8530-66c59e8b795d",
      "preferredLanguage": "PT",
      "timeZone": "seila",
      "creationDate": 1546968328780,
      "status": "ACTIVE",
      "languages": [
  		"PT",
      	"EN"
  	]
  }
  */
}
