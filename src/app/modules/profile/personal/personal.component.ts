import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { ProfileService } from '../profile.service';
import { Constants } from '../../../utils/constants'
import { AuthService } from '../../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { StorageUtils } from '../../../utils/storage-utils';
import { Register } from '../register/register';
import { User } from '../user/user';
import { Address } from '../address/address';
import { Info } from '../info/info';
import { UserReference } from '../userReference/userReference';
import { PhotoUpload } from '../photo/photo-upload';
import { ConfigurationOptions, ContentOptionsEnum, NumberResult, OutputOptionsEnum }from 'intl-input-phone';
import { isoStringToDate } from '@angular/common/src/i18n/format_date';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  @ViewChild('confirmationDialog') confirmationDialog: ElementRef;

  umteste = '(00)0000-0000';
  
  form: FormGroup;

  formConfirmation: FormGroup;

  data: any;

  cropperSettings: CropperSettings;

  register: Register;

  user: User;

  lastAddress: Address;

  info: Info;

  userReference : UserReference;

  reference: any[] = [];

  occupation: any[] = [];

  configOption1 : ConfigurationOptions;

  OutputValue : NumberResult = new NumberResult();

  NumberModel: any;
  
  logoUrl;

  showCropper: boolean;

  currentPhone: string;

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

    this.register = new Register();

    this.register.user = new User();

    this.register.user.lastAddress = new Address();

    this.register.user.info = new Info();

    //this.userReference.referenceValues = new Array();

    this.form = this.fb.group({
      name: this.fb.control(this.register.user.name, [Validators.required]),
      document: this.fb.control(this.register.user.document, [Validators.required]),
     // phoneCountryCode: this.fb.control(this.register.user.phoneCountryCode, [Validators.required]),
      //phoneNumber: this.fb.control(this.register.user.phoneNumber, [Validators.required]),
      gender: this.fb.control(this.register.user.gender, [Validators.required]),
      country: this.fb.control(this.register.user.lastAddress.country, [Validators.required]),
      city: this.fb.control(this.register.user.lastAddress.city, [Validators.required]),
      complement: this.fb.control(this.register.user.lastAddress.complement, []),
      state: this.fb.control(this.register.user.lastAddress.state, [Validators.required]),
      zipCode: this.fb.control(this.register.user.lastAddress.zipCode, [Validators.required]),
      number: this.fb.control(this.register.user.lastAddress.number, [Validators.required]),
      district: this.fb.control(this.register.user.lastAddress.district, [Validators.required]),
      street: this.fb.control(this.register.user.lastAddress.street, [Validators.required]),
      overview: this.fb.control(this.register.user.info.overview, [Validators.required]),
      occupation: this.fb.control(this.register.user.info.occupation, []),
      reference: this.fb.control('', []),
      referenceCod: this.fb.control('', [])
    })

    this.formConfirmation = this.fb.group({
      confirmationPhone: this.fb.control('', [])
    })

    this.loadReference();

    this.loadRegister();

    this.loadOccupation();

  }

  testetesteste() {
      this.NumberModel = '+55 11000000000';
      console.log('aaaaaaaaa')
  }

  loadRegister() {
    const idUser = this.storage.getIdUser() ? this.storage.getIdUser() : null;

    this.logoUrl = this.getUrl(idUser);

    if(idUser) {
      this.profileService.loadRegister(idUser)
        .subscribe(user => {
          this.register = user['data'];
          // console.log('phone', user['data'].user.phone)
          this.register.userReference.referenceValues = user['data'].userReference.referenceValues;
          if(!user['data'].user.lastAddress) {
            this.register.user.lastAddress = new Address();
          }

          if(user['data'].user.phone!= null){
            this.register.user.phone = user['data'].user.phone;
            this.NumberModel = this.register.user.phone;
            this.currentPhone = this.register.user.phone;
          }

          if(!user['data'].user.info) {
            this.register.user.info = new Info();
          }

          if(this.register.userReference.referenceValues == null) {
            this.register.userReference.referenceValues = new Array();
          }

          if(this.register.user.phone == null){
            this.testetesteste()
          }
        })

        // this.testetesteste()
    }

    //this.profileService.loadRegister()
  }

  loadReference() {
    this.profileService.loadReference()
      .subscribe(reference => this.reference = reference['data'])
  }

  loadOccupation() {
    this.profileService.loadOccupation()
      .subscribe(occupation => this.occupation = occupation['data'])
  }

  returnAddress(){
    let cep = this.form.get('zipCode').value;

    this.profileService.returnAddress(cep)
      .subscribe(response => {
        this.register.user.lastAddress.street = response['logradouro'];
        this.register.user.lastAddress.complement = response['complement'];
        this.register.user.lastAddress.district = response['bairro'];
        this.register.user.lastAddress.city = response['localidade'];
        this.register.user.lastAddress.state = response['uf'];
    });
  }

  addRegisterValue() {
    let reference = this.form.get('reference').value;

    let referenceCod = this.form.get('referenceCod').value;

    this.register.userReference.referenceValues.push({
      name: reference.name,
      number: referenceCod,
      idReference: reference.id
    })

    this.form.get('reference').setValue('');
    this.form.get('referenceCod').setValue('');
  }

  saveRegister() {
    if(this.form.valid) {
      this.profileService.saveRegister(this.register)
        .subscribe(response => {
          if(this.currentPhone != this.register.user.phone) {
            //Swall('Sucesso', 'Informações salvas com sucesso, agora confirme o telefone', 'success');
            this.openConfirmation()
          } else {
            Swall('Sucesso', 'Informações salvas com sucesso', 'success');
          }
          
        })
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty();
      })
    }
  }

  removeReferenciais(reference) {
    this.register.userReference.referenceValues = this.register.userReference.referenceValues.filter(t => t != reference)
  }

  addPhoto() {

    let photoUpload = new PhotoUpload();

    photoUpload.idObject = this.storage.getIdUser() ? this.storage.getIdUser() : null;
    photoUpload.width = 200;

    let photoUploadArray = this.data.image.split('base64,'); //only image base64 api support
    photoUpload.photo = photoUploadArray[1];

    photoUpload.idSubObject = 'main'

    const uploadedImage = this.data.image;
    this.data = {};

    this.profileService.saveUserImage(photoUpload)
      .subscribe(photoUpload => {

        console.log(photoUpload);

      this.logoUrl = uploadedImage;


      this.showCropper = false;
      this.loadRegister();
    });

  }

  onNumberChage2(outputResult) {
    console.log("Output result 2 is", outputResult.Number);    
    this.register.user.phone = this.stripNumberWithPlus(outputResult.Number);
    this.register.user.phoneCountryCode = this.parsePhoneCountry(this.stripNumber(outputResult.Number));
    this.register.user.phoneNumber = this.parsePhone(this.stripNumber(outputResult.Number), this.register.user.phoneCountryCode);
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

  getUrl(idUser): string {
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/userImage/${idUser}/main`;
    return url;
  }
  
  openConfirmation() {
    let body = document.body;
    let confirmationDialog = this.confirmationDialog.nativeElement;

    confirmationDialog.classList.toggle('active');
    body.classList.add('noscroll');
  }

  closeConfirmationClose() { 
    let body = document.body;
    let confirmationDialog = this.confirmationDialog.nativeElement;

    confirmationDialog.classList.toggle('active');
    body.classList.remove('noscroll');
  }

  sendConfirmation() {

    const code = {
      idUser: this.storage.getIdUser(),
      key: this.formConfirmation.get('confirmationPhone').value,
      type: 'SMS'
    }

    this.profileService.confirmationPhone(code)
      .subscribe(response => {
        console.log(response['data'])
        if(response['data']) {
          Swall('Sucesso', 'Informações salvas com sucesso', 'success');
          this.closeConfirmationClose();
        } else {
          Swall('Código incorreto', 'O código está incorreto, verifique e tente novamente', 'error');
        }
      })
  }

}

