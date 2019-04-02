import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageUtils } from '../../utils/storage-utils';
import { AdvertService } from '../advert.service';
import { Constants } from '../../utils/constants';
import Swall from "sweetalert2";

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {

  adverts: any[] = [];
  registerChecked: boolean = false;

  constructor(private storage: StorageUtils,
              private advertService: AdvertService,
              private router: Router) { }

  ngOnInit() {

    let idUser = this.storage.getIdUser();
    let page = 1;

    this.loadAdverts(idUser, page);
    this.checkRegister(idUser);
  }

  loadAdverts(idUser, page) {
    //loadAdverts

    this.advertService.loadAdverts(idUser, page)
      .subscribe(response => {
        console.log(response);
        this.adverts = response['data'];
      })
  }

  checkRegister(idUser) {
    this.advertService.checkRegister(idUser)
      .subscribe(response => {
        console.log('check', response);
        this.registerChecked = response['data'];
      })
  }

  handleCheckRegister() {
    console.log('checado', this.registerChecked)
    if(this.registerChecked) {
      this.router.navigate(['/price-settings'])
    } else {
      Swall('', 'Você precisa completar seu cadastro para poder criar um anúncio', 'error')
      .then((result) => {
       if (result.value) {
         this.router.navigate(['/account'])
       }
      })
    }
  }

  getImageServicesFeatured(id: string, idGalery: string) {
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}service/image/${id}/${idGalery}`

    return url;
  }
}
