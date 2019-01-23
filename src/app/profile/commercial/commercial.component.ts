import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { ProfileService } from '../profile.service';
import { Constants } from '../../utils/constants'
import { AuthService } from '../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { StorageUtils } from '../../utils/storage-utils';
import { Company } from '../company/company';
import { User } from '../user/user';
import { Address } from '../address/address';
import { Info } from '../info/info';
import { UserReference } from '../userReference/userReference';
import { PhotoUpload } from '../photo/photo-upload';

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


    this.company = new Company();

    this.company.addressInfo = new Address();

    this.company.info = new Info();


    this.form = this.fb.group({
      fantasyName: this.fb.control(this.company.fantasyName, [Validators.required]),
      document: this.fb.control(this.company.document, []),
      phoneCountryCode: this.fb.control(this.company.phoneCountryCode, [Validators.required]),
      phoneNumber: this.fb.control(this.company.phoneNumber, [Validators.required]),
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

    this.profileService.saveCompany(this.company)
      .subscribe(response => {
        console.log(response);
        if(response['success']) {
          Swall('Sucesso', 'Informações salvas com sucesso', 'success');
        } else {
           Swall('Erro', 'Não foi possível salvar, verifique e tente novamente', 'error')
          }
      })
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

  /*

  {
    "id": "9fddcbf1-f894-404a-935d-eec019aad1b6",
    "idUser": "cc493975-9a0e-495a-8530-66c59e8b795d",
    "document": "902318049218",
    "fantasyName": "Empresa do Renan",
    "status": "ACTIVE",
    "phoneNumber": 40028922,
    "phoneCountryCode": 55,
    "addressInfo" : {
        "complement" : "...",
        "zipCode" : "06604130",
        "number" : "55",
        "city" : "Jandira",
        "district" : "Jardim Novo Horizonte",
        "street" : "Rua Sonia Maria F. de Andrade",
        "country" : "Brazil",
        "state" : "São Paulo"
    },
    "info": {
        "hiringRules": "Lorem ipsum sapien porttitor tincidunt consectetur nibh quis sagittis, dapibus nec arcu ac diam cubilia sit faucibus massa, aliquam quisque aliquet duis dolor nec elementum. laoreet ultricies pellentesque risus aliquam lectus dui sit suscipit, justo aenean dapibus cras euismod enim himenaeos consectetur, placerat et lacinia cursus venenatis lacus et. lorem nisi dictum dui convallis neque accumsan ligula eleifend aenean, senectus interdum commodo duis habitant etiam consectetur proin. accumsan pharetra ut erat vitae scelerisque eleifend mauris maecenas, donec venenatis curabitur lobortis magna vel vulputate vel quisque, luctus venenatis aenean laoreet quam varius viverra. Arcu aliquet euismod sociosqu aptent commodo ut malesuada egestas pulvinar risus at, hac habitant tortor donec dapibus pharetra risus tristique phasellus. quam leo convallis luctus eros nulla erat rutrum nec, hac ut himenaeos metus porta elementum leo vel mollis, quis quam tempus erat libero vitae sodales. donec fringilla rhoncus proin a etiam vivamus nostra, aenean libero curabitur sociosqu donec erat tempus egestas, porttitor pharetra fermentum potenti convallis hac. consectetur nostra praesent inceptos eros class fermentum aenean est eleifend egestas venenatis id tincidunt conubia vivamus, lacus ut metus donec lobortis augue aenean egestas tincidunt lectus urna netus ante at.Fermentum duis dolor aliquet odio libero justo praesent dapibus tellus leo, cursus sed litora inceptos donec netus sem purus a cursus, proin primis morbi varius ac lacinia dictumst blandit ornare.",
        "comprehensiveness" : "Barueri, Brazil",
        "fgIsCompany" : "true",
        "fgShow" : "true"
    }
}
*/
}
