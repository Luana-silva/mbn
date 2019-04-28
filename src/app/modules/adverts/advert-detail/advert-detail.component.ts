import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Route, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { AdvertService } from '../advert.service';
import { Constants } from '../../../utils/constants';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale); 
import { AuthService } from '../../../shared/auth/auth.service';


@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {

  service: any = {};

  form: FormGroup;

  locale = 'pt-BR';

  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  

  idObj: string;

  @ViewChild('mettingcontainer') mettingcontainer: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertService: AdvertService,
              private fb: FormBuilder,
              private authService: AuthService,
              private localeService: BsLocaleService) { 

                this.bsConfig = Object.assign({}, { containerClass: 'theme-blue', dateInputFormat: 'DD/MM/YYYY' });

                localeService.use('pt-br');
              }

  ngOnInit() {

    this.form = this.fb.group({
      dateBegin: this.fb.control('', [Validators.required]),
    })

    this.route.params.subscribe((param) => {
      let id = param['id'];

      this.loadDetailService(id);
    })

  }

  logged() {
    return this.authService.isLoggedIn();
  }

  loadDetailService(id: string) {
    this.advertService.loadDetailService(id)
      .subscribe(response => {
        console.log(response['data'].serviceExt)
        this.service = response['data'];
        this.idObj = response['data'].rating.idObj;
      })
  }

  getImageServicesFeatured(id: string, idGalery: string) {
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}service/image/${id}/${idGalery}`

    return url;
  }

  openMetting() {

    //event.stopPropagation();
    
    let mettingContainer = this.mettingcontainer.nativeElement;
    let body = document.body;
    
    mettingContainer.classList.toggle('active');

   
    body.classList.add('noscroll');

  }

  closeMetting() {
    let mettingContainer = this.mettingcontainer.nativeElement;
    let body = document.body;

    mettingContainer.classList.remove('active');

  
    body.classList.remove('noscroll');
  }

  canHiring() {
    //[routerLink]="['/hireservice', service?.rating?.idObj]"
    if(!this.logged()) {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/hireservice', this.idObj])
    }
  }

  canTalking() {
    //[routerLink]="['/talksupplier', service?.rating?.idObj]"
    if(!this.logged()) {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/talksupplier', this.idObj])
    }
  }
}
