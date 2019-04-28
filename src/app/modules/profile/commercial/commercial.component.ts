import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { ProfileService } from '../profile.service';
import { Constants } from '../../../utils/constants'
import { AuthService } from '../../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { StorageUtils } from '../../../utils/storage-utils';
import { Company } from '../company/company';
import { User } from '../user/user';
import { Address } from '../address/address';
import { Info } from '../info/info';
import { UserReference } from '../userReference/userReference';
import { PhotoUpload } from '../photo/photo-upload';
import { ConfigurationOptions, ContentOptionsEnum, NumberResult, OutputOptionsEnum }from 'intl-input-phone';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss']
})
export class CommercialComponent implements OnInit {

  form: FormGroup;

  idCompany: string;

  data: any;

  cropperSettings: CropperSettings;

  company: Company;

  addressInfo: Address;

  info: Info;

  logoUrl;

  showCropper: boolean;

  configOption1 : ConfigurationOptions;

  OutputValue : NumberResult = new NumberResult();

  NumberModel: any;

  @ViewChild('cropper', undefined)

  cropper: ImageCropperComponent;

  constructor(private profileService: ProfileService,
              private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder) {

                this.configOption1 = new ConfigurationOptions();
                this.configOption1.SelectorClass = "WithBasic";
          
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


    this.company = new Company();

    this.company.addressInfo = new Address();

    this.company.info = new Info();


    this.form = this.fb.group({
      fantasyName: this.fb.control(this.company.fantasyName, [Validators.required]),
      document: this.fb.control(this.company.document, []),
      // phoneCountryCode: this.fb.control(this.company.phoneCountryCode, [Validators.required]),
      // phoneNumber: this.fb.control(this.company.phoneNumber, [Validators.required]),
      country: this.fb.control(this.company.addressInfo.country, [Validators.required]),
      city: this.fb.control(this.company.addressInfo.city, [Validators.required]),
      complement: this.fb.control(this.company.addressInfo.complement, []),
      state: this.fb.control(this.company.addressInfo.state, [Validators.required]),
      zipCode: this.fb.control(this.company.addressInfo.zipCode, [Validators.required]),
      number: this.fb.control(this.company.addressInfo.number, [Validators.required]),
      district: this.fb.control(this.company.addressInfo.district, [Validators.required]),
      street: this.fb.control(this.company.addressInfo.street, [Validators.required]),
      hiringRules: this.fb.control(this.company.info.hiringRules, [Validators.required]),
      comprehensiveness: this.fb.control(this.company.info.comprehensiveness, [Validators.required]),
      fgIsCompany: this.fb.control(this.company.info.fgIsCompany, [Validators.required]),
      fgShow: this.fb.control(this.company.info.fgShow, [Validators.required]),
    })


    this.loadCompany();
  }

  loadCompany() {

    const idUser = this.storage.getIdUser() ? this.storage.getIdUser() : null;

    this.profileService.loadCompany(idUser)
      .subscribe(company => {

        this.company = company['data'];
        this.idCompany = company['data'].id;
        this.logoUrl = this.getUrl(this.idCompany);

        if(!company['data'].addressInfo) {
          this.company.addressInfo = new Address();
        }

        if(!company['data'].info) {
          this.company.info = new Info();
        }
        if(company['data'].phone!= null){
          this.company.phone = company['data'].phone;
          this.NumberModel = this.company.phone;
        }

        if(this.company.phone == null){
          this.NumberModel = '+55 11000000000';
        }
      })
  }

  returnAddress(){
    let cep = this.form.get('zipCode').value;

    this.profileService.returnAddress(cep)
      .subscribe(response => {
        console.log(response)
        this.form.get('street').setValue(response['logradouro']);
        this.form.get('complement').setValue(response['complement']);
        this.form.get('district').setValue(response['bairro']);
        this.form.get('city').setValue(response['localidade']);
        this.form.get('state').setValue(response['uf']);
    });
  }

  saveCompany() {
    if(this.form.valid) {
      this.profileService.saveCompany(this.company)
        .subscribe(response => {
          console.log(response);
          if(response['success']) {
            Swall('Sucesso', 'Informações salvas com sucesso', 'success');
          } else {
             Swall('Erro', 'Não foi possível salvar, verifique e tente novamente', 'error')
            }
        })
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty();
      })
    }
  }

  onNumberChage2(outputResult) {
    this.company.phone = this.stripNumberWithPlus(outputResult.Number);
    this.company.phoneCountryCode = this.parsePhoneCountry(this.stripNumber(outputResult.Number));
    this.company.phoneNumber = this.parsePhone(this.stripNumber(outputResult.Number), this.company.phoneCountryCode);
  }

  stripNumber(number) {
    return number.replace('(', '').replace(')', '').replace('-', '').replace('+', '');
  }

  stripNumberWithPlus(number) {
    return number.replace('(', '').replace(')', '').replace('-', '');
  }

  parsePhoneCountry(phone) {
    return phone.split(' ')[0];
  }

  parsePhone(phone, phoneCountry) {
    return phone.replace(phoneCountry, '').trim().replace(/\s/ig, '');
  }

  addPhoto() {

    let photoUpload = new PhotoUpload();

    photoUpload.idObject = this.idCompany;
    photoUpload.width = 200;

    let photoUploadArray = this.data.image.split('base64,'); //only image base64 api support
    photoUpload.photo = photoUploadArray[1];

    photoUpload.idSubObject = 'main'

    const uploadedImage = this.data.image;
    this.data = {};

    this.profileService.saveCompanyImage(photoUpload)
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

}
