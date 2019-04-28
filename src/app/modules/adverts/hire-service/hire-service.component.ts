import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Route, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { ConfigurationOptions, ContentOptionsEnum, NumberResult, OutputOptionsEnum }from 'intl-input-phone';
import { Constants } from '../../../utils/constants'
import Swall from "sweetalert2";
import { StorageUtils } from '../../../utils/storage-utils';
import { AuthService } from '../../../shared/auth/auth.service';
import { Booking } from '../class/booking/booking';
import { Info } from '../class/info/info';
import { Card } from '../class/card/card';
import { Address } from '../class/address/address';
import { AdvertService } from '../advert.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-hire-service',
  templateUrl: './hire-service.component.html',
  styleUrls: ['./hire-service.component.scss']
})
export class HireServiceComponent implements OnInit {

  form: FormGroup;

  formMessage: FormGroup;
  
  configOption1 : ConfigurationOptions;

  OutputValue : NumberResult = new NumberResult();

  NumberModel: any;

  booking: Booking;

  idObj: string;

  descObj: string;

  service: any = {};

  serviceDetail: any = {}

  imageUser: any;

  listModels: any[] = [];

  locale = 'pt-BR';

  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  showStepOne: boolean = true;
  showStepTwo: boolean = false;
  showStepThree: boolean = false;
  
  visitPrice: any;
  price: any;
  total: any = 0

  @ViewChild('tabStepOne') tabStepOne :  ElementRef;
  @ViewChild('tabStepTwo') tabStepTwo: ElementRef;
  @ViewChild('tabStepThree') tabStepThree: ElementRef;

  constructor(private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder,
              private advertService: AdvertService,
              private route: ActivatedRoute,
              private router: Router) { 

              this.configOption1 = new ConfigurationOptions();
              this.configOption1.SelectorClass = "WithBasic";

              this.bsConfig = Object.assign({}, { containerClass: 'theme-blue', dateInputFormat: 'DD/MM/YYYY' });
              }

  ngOnInit() {

    this.booking = new Booking();
    this.booking.info = new Info();
    this.booking.card = new Card();
    this.booking.card.address = new Address();
    
    this.form = this.fb.group({
      projectName: this.fb.control(this.booking.info.projectName, [Validators.required]),
      projectAddress: this.fb.control(this.booking.info.projectAddress, [Validators.required]),
      terrain: this.fb.control(this.booking.info.terrain, [Validators.required]),
      constructed: this.fb.control(this.booking.info.constructed, [Validators.required]),
      tipology: this.fb.control(this.booking.info.tipology, [Validators.required]),
      dateBegin: this.fb.control(this.booking.dateBegin, [Validators.required]),
      number: this.fb.control(this.booking.card.number, [Validators.required]),
      ccv: this.fb.control(this.booking.card.ccv, [Validators.required]),
      expirationYear: this.fb.control(this.booking.card.expirationYear, [Validators.required]),
      expirationMonth: this.fb.control(this.booking.card.expirationMonth, [Validators.required]),
      name: this.fb.control(this.booking.card.name, [Validators.required]),
      cpf: this.fb.control(this.booking.card.cpf, [Validators.required]),
      street: this.fb.control(this.booking.card.address.street, [Validators.required]),
      district: this.fb.control(this.booking.card.address.district, [Validators.required]),
      city: this.fb.control(this.booking.card.address.city, [Validators.required]),
      state: this.fb.control(this.booking.card.address.state, [Validators.required]),
      country: this.fb.control(this.booking.card.address.country, [Validators.required]),
      zipCode: this.fb.control(this.booking.card.address.zipCode, [Validators.required]),
      saveDataCard: this.fb.control(false, []),
      total: this.fb.control(100, []),
    })

    this.route.params.subscribe((param) => {
      let id = param['id'];

      this.booking.idService = id;
      this.loadDetailService(id);
    })

    this.formMessage = this.fb.group({
      modelOption: this.fb.control('', []),
      model: this.fb.control('', [Validators.required]),
    })

    this.messageModel();
  }


  onNumberChage2(outputResult) {  
    this.booking.info.number =  outputResult.Number;
  }

  messageModel() {
    this.advertService.messageModel().subscribe(response => {
      this.listModels = response['data']
    })
  }

  loadDetailService(id: string) {
    this.advertService.loadDetailService(id)
      .subscribe(response => {


        this.service = response['data'];
        this.imageUser = this.getUserImage(response['data'].userCard.id)
        this.idObj = response['data'].userCard.id;
        this.booking.idProfessional = response['data'].userCard.id;
        this.booking.idCompany = response['data'].company.id;
        this.descObj = response['data'].serviceExt.name
        this.visitPrice  = parseInt(response['data'].serviceExt.info.visitPrice);
        this.price = response['data'].serviceExt.price
        this.total = 100 * parseInt(this.visitPrice) + Number(this.price)
      })
  }

  getUserImage(id) {
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/userImage/${id}/main`;
    return url
  }

  returnAddress() {
    let cep = this.form.get('zipCode').value;

    this.advertService.returnAddress(cep)
      .subscribe(response => {
        console.log(response)
        this.form.get('street').setValue(response['logradouro']);
        this.form.get('district').setValue(response['bairro']);
        this.form.get('city').setValue(response['localidade']);
        this.form.get('state').setValue(response['uf']);
    });
  }

  setModel() {
    let modelOption = this.formMessage.get('modelOption').value;
    let model = this.formMessage.get('model')

    model.setValue(modelOption.message);

    console.log(modelOption)
  }

  faqSave() {

    const message = {
      idObj : this.idObj,
      descObj : this.descObj,
      messageQuestion : {
        idUser : this.storage.getIdUser(),
        message : this.formMessage.get('model').value
      }
    }

    this.advertService.faqSave(message)
      .subscribe(response => {
        console.log(response)

        if(response['success']) {
          Swall('Sucesso', 'Mensagem enviada com sucesso', 'success');
          this.formMessage.get('model').setValue('');
        } else {
          Swall('Erro', 'Não foi possível enviar a mensagem', 'success');
        }
      })
  }
  
  goStepTwo() {

    const inputs = ['projectName', 
                    'projectAddress', 
                    'terrain', 
                    'constructed', 
                    'tipology', 
                    'dateBegin']

    const inputsValid = inputs.map(x => this.form.get(x).valid);

    let isValid = inputsValid.every(x => x == true);
    inputs.forEach(input => {
      this.form.get(input).markAsDirty();


      if(!isValid) {
       // alert('Você precisa preencher todos os campos para poder ir pra etapa seguinte')
      } else {
        this.showStepOne = false;
        this.showStepTwo = true;
        let tabStepTwo = this.tabStepTwo.nativeElement;
        let tabStepOne = this.tabStepOne.nativeElement;

        tabStepTwo.children[0].classList.add('border-step--active');
        tabStepTwo.children[1].classList.add('number-step--active');
        tabStepOne.children[1].classList.add('fill');
      }
    })

    window.scroll(0,0);
  }

 backStepOne() {
  this.showStepOne = true;
  this.showStepTwo = false;
  window.scroll(0,0);
 }

 goStepThree() {
  //this.stepOne.nativeElement.classList.add('hidden');
  
  this.showStepOne = false;
  this.showStepTwo = false;
  this.showStepThree = true;
  let tabStepThree = this.tabStepThree.nativeElement;
  let tabStepTwo = this.tabStepTwo.nativeElement;

  tabStepThree.children[0].classList.add('border-step--active');
  tabStepThree.children[1].classList.add('number-step--active');
  tabStepTwo.children[1].classList.add('fill');
  window.scroll(0,0);
}

backStepTwo() {
this.showStepTwo = true;
this.showStepThree = false;
window.scroll(0,0);
}

defPrice() {
  let qtdM = this.form.get('total').value;

  this.total = qtdM * parseInt(this.visitPrice) + Number(this.price);
}

 save() {
  
  this.booking.idUser = this.storage.getIdUser();
  this.booking.total = this.total;
  this.advertService.createBooking(this.booking)
    .subscribe(response => {
      console.log(response);

      if(response['success']) {
        const id = response['data'].id
        this.router.navigate(['/finalizeservice', id])
      } else {
        Swall('Erro', 'Não foi possível completar a ação, verifique e tente novamente', 'error')
      }
    })
 }

 getImageServicesFeatured(id: string, idGalery: string) {
  let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}service/image/${id}/${idGalery}`

  return url;
}

getCompanyImage(idCompany): string {
  //http://127.0.0.1:8080/MBNWs/rs/companyExt/companyImage/9fddcbf1-f894-404a-935d-eec019aad1b6/main
  let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}companyExt/companyImage/${idCompany}/main`;
  return url;
}
}
