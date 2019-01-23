import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
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
  selector: 'app-register-ad-three',
  templateUrl: './register-ad-three.component.html',
  styleUrls: ['./register-ad-three.component.scss']
})
export class RegisterAdThreeComponent implements OnInit {

  form: FormGroup;

  data: any;

  service: Service;

  typologies: any[] = [];

  restrictions: any[] = [];

  cropperSettings: CropperSettings;

  solutions: any[] = [];

  constructor(private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder,
              private advertService: AdvertService) { }

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
      solutions: this.fb.control('', []),
      value: this.fb.control(this.service.otherTaxes.value, []),
      executionTime: this.fb.control('', [Validators.required]),
      typology: this.fb.control('', []),
      restriction: this.fb.control('', []),
    })

    this.loadSolutions();
  }

  loadSolutions() {
    this.advertService.loadSolutions()
      .subscribe(response => {
        this.solutions = response['data'];
        console.log(response)
      })
  }
}
