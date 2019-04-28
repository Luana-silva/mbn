import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Route, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Constants } from '../../../utils/constants'
import { AuthService } from '../../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { StorageUtils } from '../../../utils/storage-utils';
import { Service } from '../class/service/service';
import { Address } from '../class/address/address';
import { AdvertService } from '../advert.service';
import { Info } from '../class/info/info';
import { PhotoUpload } from '../class/photo/photo-upload';

@Component({
  selector: 'app-register-ad-two',
  templateUrl: './register-ad-two.component.html',
  styleUrls: ['./register-ad-two.component.scss']
})
export class RegisterAdTwoComponent implements OnInit {

  form: FormGroup;

  service: Service;

  id: string;
  
  data: any;

  cropperSettings: CropperSettings;
  
  logoUrl;

  showCropper: boolean;

  @ViewChild('cropper', undefined)

  cropper: ImageCropperComponent;

  constructor(private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder,
              private advertService: AdvertService,
              private route: ActivatedRoute,
              private router: Router) { 

                this.showCropper = false;
                this.cropperSettings = new CropperSettings();
                this.cropperSettings.width = 100;
                this.cropperSettings.height = 100;
                this.cropperSettings.croppedWidth =100;
                this.cropperSettings.croppedHeight = 100;
                this.cropperSettings.canvasWidth = 400;
                this.cropperSettings.canvasHeight = 300;
                this.cropperSettings.noFileInput = true;

                this.data = {};
              }

  ngOnInit() {

    this.route.params.subscribe((param) => {
      this.id = param['id'];
    })

    this.service = new Service();
    this.service.info = new Info();
    this.service.addressInfo = new Address();

    this.loadService(this.id);

    this.form = this.fb.group({
      name: this.fb.control(this.service.name, [Validators.required]),
      desc: this.fb.control(this.service.desc, [Validators.required]),
      detail: this.fb.control(this.service.info.detail, [Validators.required]),
      country: this.fb.control(this.service.addressInfo.country, [Validators.required]),
      city: this.fb.control(this.service.addressInfo.city, [Validators.required]),
      complement: this.fb.control(this.service.addressInfo.complement, []),
      state: this.fb.control(this.service.addressInfo.state, [Validators.required]),
      zipCode: this.fb.control(this.service.addressInfo.zipCode, [Validators.required]),
      street: this.fb.control(this.service.addressInfo.street, [Validators.required]),
      number: this.fb.control(this.service.addressInfo.number, [Validators.required]),
      district: this.fb.control(this.service.addressInfo.district, [Validators.required]),
    })
  }

  saveService() {
    this.service.id = this.id;

    this.advertService.saveBasic(this.service)
      .subscribe(response => {
        console.log(response);
        this.router.navigate([`/comprehensiveness/${this.id}`]);
      })
  }

  loadService(id) {
    this.advertService.loadService(id)
      .subscribe(response => { 
        this.service = response['data'];
        if(!response['data'].addressInfo) {
          this.service.addressInfo = new Address();
        }
      })
  }

  returnAddress() {
    let cep = this.form.get('zipCode').value;

    this.advertService.returnAddress(cep)
      .subscribe(response => {
        console.log(response)
        this.form.get('street').setValue(response['logradouro']);
        this.form.get('complement').setValue(response['complement']);
        this.form.get('district').setValue(response['bairro']);
        this.form.get('city').setValue(response['localidade']);
        this.form.get('state').setValue(response['uf']);
    });
  }

  addPhoto() {

    let photoUpload = new PhotoUpload();

    photoUpload.idObject = this.id;
    photoUpload.width = 200;

    let photoUploadArray = this.data.image.split('base64,'); //only image base64 api support
    photoUpload.photo = photoUploadArray[1];

    //photoUpload.idSubObject = 'main'

    const uploadedImage = this.data.image;
    this.data = {};

    this.advertService.saveImage(photoUpload)
      .subscribe(photoUpload => {

        console.log(photoUpload);

      this.logoUrl = uploadedImage;
      this.showCropper = false;

    });

  }

  // cropper
  fileChangeListener($event) {
    this.showCropper = true;
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  getUrl(idCompany): string {
    //http://127.0.0.1:8080/MBNWs/rs/companyExt/companyImage/9fddcbf1-f894-404a-935d-eec019aad1b6/main
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}companyExt/companyImage/${idCompany}/main`;
    return url;
  }

  breve() {
    Swall('Erro', 'Funcionalidade ainda não implementada', 'error')
  }
}
