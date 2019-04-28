import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Route, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Constants } from '../../../utils/constants'
import { AuthService } from '../../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { StorageUtils } from '../../../utils/storage-utils';
import { Service } from '../class/service/service';
import { Info } from '../class/info/info';
import { OtherTaxes } from '../class/otherTaxes/otherTaxes';
import { AdvertService } from '../advert.service';

@Component({
  selector: 'app-register-ad-three',
  templateUrl: './register-ad-three.component.html',
  styleUrls: ['./register-ad-three.component.scss']
})
export class RegisterAdThreeComponent implements OnInit {

  form: FormGroup;

  data: any;

  service: Service;

  comprehensivenessList: any[] = [];

  licenseList: any[] = [];

  restrictions: any[] = [];

  cropperSettings: CropperSettings;

  solutions: any[] = [];

  referencesList: any[] = [];

  references: any[] = [];

  id: string;

  constructor(private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder,
              private advertService: AdvertService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((param) => {
      this.id = param['id'];
    })

    this.service = new Service();

    this.form = this.fb.group({
      //comprehensiveness: this.fb.control('', []),
      category: this.fb.control(this.service.category, [Validators.required]),
      license: this.fb.control('', []),
      references: this.fb.control('', []),
    })

    this.loadSolutions();

    this.loadReference();
  }

  loadSolutions() {
    this.advertService.loadSolutions()
      .subscribe(response => {
        this.solutions = response['data'];
        console.log(response)
      })
  }

  loadReference() {
    this.advertService.loadReference()
      .subscribe(response => {
        this.references = response['data'];
      })
  }

  addComprehensiveness() {
    if(this.form.get('comprehensiveness').value != '') {
      this.comprehensivenessList.push(this.form.get('comprehensiveness').value);
      this.form.get('comprehensiveness').setValue('');
    }
  }

  removeComprehensiveness(comprehensiveness) {
    console.log(comprehensiveness);
    this.comprehensivenessList = this.comprehensivenessList.filter(t => t != comprehensiveness)
  }

  addLicense() {
    console.log(this.licenseList)
    if(this.form.get('license').value != '') {
      this.licenseList.push(this.form.get('license').value);
      this.form.get('license').setValue('');
    }
  }

  removeLicense(license) {
    console.log(license);
    this.licenseList = this.licenseList.filter(t => t != license)
  }

  addReferences() {
    console.log(this.referencesList)
    if(this.form.get('references').value != '') {
      this.referencesList.push(this.form.get('references').value);
      this.form.get('references').setValue('');
    }
  }

  removeReferences(reference) {
    console.log(reference);
    this.referencesList = this.referencesList.filter(ref => ref.id != reference.id)
  }

  saveService() {

  //  this.service.comprehensiveness = this.comprehensivenessList;
    this.service.license = this.licenseList;
    this.service.references = this.referencesList;
    this.service.status = 'ACTIVE';
    this.service.id = this.id;

    this.advertService.saveBasic(this.service)
      .subscribe(response => {
        if(response['success']) {
          Swall('Sucesso', 'Informações salvas com sucesso', 'success');
        } else {
           Swall('Erro', 'Não foi possível salvar, verifique e tente novamente', 'error')
          }
      })
  }
}
