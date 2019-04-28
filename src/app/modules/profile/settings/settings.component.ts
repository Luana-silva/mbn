import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { ProfileService } from '../profile.service';
import { Constants } from '../../../utils/constants'
import { AuthService } from '../../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { StorageUtils } from '../../../utils/storage-utils';
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

  languages: any[] = [];

  currency: any[] = [];

  timezone: any[] = [];
  
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
      preferredCurrency: this.fb.control(this.setting.preferredCurrency, [Validators.required]),
      preferredUnitySystem: this.fb.control(this.setting.preferredUnitySystem, [Validators.required]),
    })

    this.loadSettings();
    this.loadLanguages();
    this.loadCurrency();
    this.listTimezone();
  }


  loadSettings() {

    const idUser = this.storage.getIdUser() ? this.storage.getIdUser() : null;

    this.profileService.loadSettings(idUser)
      .subscribe(settings => {
        console.log(settings);
        this.setting = settings['data'];
      })
  }

  loadLanguages() {

    this.profileService.loadLanguages()
      .subscribe(languages => {
        this.languages = languages['data'];
      })
  }

  loadCurrency() {

    this.profileService.loadCurrency()
      .subscribe(currency => {
        this.currency = currency['data'];
      })
  }

  saveSettings() {
    this.profileService.saveSettings(this.setting)
      .subscribe(response => {
        console.log(response);
        if(response['success']) {
          Swall('Sucesso', 'Informações salvas com sucesso', 'success');
        } else {
          Swall('Erro', 'Não foi possível salvar, verifique e tente novamente', 'error');
        }
      })
  }

  listTimezone() {
    this.profileService.listTimezone()
      .subscribe(response => {
        this.timezone = response['data'];
      })
  }
}
