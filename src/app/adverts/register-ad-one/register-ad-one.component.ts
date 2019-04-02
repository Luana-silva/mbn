import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../utils/constants'
import { AuthService } from '../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { StorageUtils } from '../../utils/storage-utils';
import { Service } from '../class/service/service';
import { Info } from '../class/info/info';
import { OtherTaxes } from '../class/otherTaxes/otherTaxes';
import { AdvertService } from '../advert.service';

@Component({
  selector: 'app-register-ad-one',
  templateUrl: './register-ad-one.component.html',
  styleUrls: ['./register-ad-one.component.scss']
})
export class RegisterAdOneComponent implements OnInit {

  form: FormGroup;

  data: any;

  service: Service;

  typologies: any[] = [];

  restrictions: any[] = [];

  cropperSettings: CropperSettings;


  constructor(private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder,
              private advertService: AdvertService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.service = new Service();
    this.service.info = new Info();
    this.service.otherTaxes = new OtherTaxes();

    this.form = this.fb.group({
      price: this.fb.control(this.service.price, [Validators.required]),
      minimalFootage: this.fb.control(this.service.info.minimalFootage, [Validators.required]),
      presetationPrice: this.fb.control(this.service.info.presetationPrice, [Validators.required]),
      visitPrice: this.fb.control(this.service.info.visitPrice, [Validators.required]),
      name: this.fb.control(this.service.otherTaxes.name, []),
      value: this.fb.control(this.service.otherTaxes.value, []),
      executionTime: this.fb.control('', [Validators.required]),
      typology: this.fb.control('', []),
      restriction: this.fb.control('', []),
    })
  }

  addTypologies() {
    if(this.form.get('typology').value != '') {
      this.typologies.push(this.form.get('typology').value);
      this.form.get('typology').setValue('');
      console.log(this.typologies);
    }
  }

  removeTypologies(typology) {
    console.log(typology);
    this.typologies = this.typologies.filter(t => t != typology)
  }

  addRestrictions() {

    if(this.form.get('restriction').value != '') {
      this.restrictions.push(this.form.get('restriction').value);
      this.form.get('restriction').setValue('');
      console.log(this.restrictions);
    }
  }

  removeRestrictions(restriction) {
    console.log(restriction);
    this.restrictions = this.restrictions.filter(t => t != restriction)
  }

  saveService() {
    this.service.idObj = this.storage.getIdUser();
    this.service.restriction = this.restrictions;
    this.service.typology = this.typologies;
    this.service.status = 'PENDENT';

    this.advertService.saveService(this.service)
      .subscribe(response => {
        console.log(response);
        if(response['success']) {
          const id = response['data'].id;
          this.router.navigate([`/listing-details/${id}`]);
        } else {
           Swall('Erro', 'Não foi possível salvar, verifique e tente novamente', 'error')
          }

      })
  }

}
