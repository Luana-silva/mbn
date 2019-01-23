import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { ProfileService } from '../profile.service';
import { Constants } from '../../utils/constants'
import { AuthService } from '../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { StorageUtils } from '../../utils/storage-utils';
import { Register } from '../register/register';
import { User } from '../user/user';
import { Address } from '../address/address';
import { Info } from '../info/info';
import { UserReference } from '../userReference/userReference';
import { PhotoUpload } from '../photo/photo-upload';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  form: FormGroup;

  data: any;

  cropperSettings: CropperSettings;

  register: Register;

  user: User;

  lastAddress: Address;

  info: Info;

  userReference : UserReference;

  reference: any[] = [];

  occupation: any[] = [];

  logoUrl;

  showCropper: boolean;

  @ViewChild('cropper', undefined)

  cropper: ImageCropperComponent;

  constructor(private profileService: ProfileService,
              private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder) {

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
      phoneCountryCode: this.fb.control(this.register.user.phoneCountryCode, [Validators.required]),
      phoneNumber: this.fb.control(this.register.user.phoneNumber, [Validators.required]),
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
      occupation: this.fb.control(this.register.user.info.occupation, [Validators.required]),
      reference: this.fb.control('', [Validators.required]),
      referenceCod: this.fb.control('', [Validators.required]),
    })

    this.loadReference();

    this.loadRegister();

    this.loadOccupation();
  }

  loadRegister() {

    const idUser = this.storage.getIdUser() ? this.storage.getIdUser() : null;

    this.logoUrl = this.getUrl(idUser);

    console.log('logo', this.logoUrl)
    if(idUser) {
      this.profileService.loadRegister(idUser)
        .subscribe(user => {

          this.register = user['data'];
          this.register.userReference.referenceValues = user['data'].userReference.referenceValues;
          if(!user['data'].user.lastAddress) {
            this.register.user.lastAddress = new Address();
          }

          if(!user['data'].user.info) {
            this.register.user.info = new Info();
          }

          if(this.register.userReference.referenceValues == null) {
            this.register.userReference.referenceValues = new Array();
          }

          console.log(user['data'].user.lastAddress)
          console.log(Object.keys(user['data'].user))
        })
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
        console.log(response)
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
    console.log(this.register.userReference.referenceValues)
  }

  saveRegister() {
    this.profileService.saveRegister(this.register)
      .subscribe(response => {
        console.log(response);
        Swall('Sucesso', 'Informações salvas com sucesso', 'success');
      })
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
    // http://192.168.123.10:8080/MBNWs/rs/user/userImage/8fa06e87-d7ee-4365-8e6b-6684176a0b00/main
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/userImage/${idUser}/main`;
    return url;
  }
}
