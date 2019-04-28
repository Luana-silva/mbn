import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Route, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import Swall from "sweetalert2";
import { StorageUtils } from '../../../utils/storage-utils';
import { AuthService } from '../../../shared/auth/auth.service';
import { Booking } from '../class/booking/booking';
import { Info } from '../class/info/info';
import { Card } from '../class/card/card';
import { Address } from '../class/address/address';
import { AdvertService } from '../advert.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Constants } from '../../../utils/constants'

@Component({
  selector: 'app-finalize-hiring',
  templateUrl: './finalize-hiring.component.html',
  styleUrls: ['./finalize-hiring.component.scss']
})
export class FinalizeHiringComponent implements OnInit {

  booking: Booking;
  imageUser: any;

  constructor(private storage: StorageUtils,
    private authService: AuthService,
    private fb: FormBuilder,
    private advertService: AdvertService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.booking = new Booking();
    this.booking.info = new Info();
    this.booking.card = new Card();
    this.booking.card.address = new Address();


    this.route.params.subscribe((param) => {
      console.log(param)
      let id = param['id'];

      //this.booking.idService = id;
      this.loadDetailBooking(id);
    })
  }


  loadDetailBooking(id: string) {
    this.advertService.loadBookingDetail(id)
      .subscribe(response => {
        this.booking = response['data'];
        this.imageUser = this.getUserImage(response['data'].userCard.id)
      })
  }

  getUserImage(id) {
    //http://127.0.0.1:8080/MBNWs/rs/user/userImage/ba62f9d3-fced-4114-ac93-990aa1de2a66/main
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/userImage/${id}/main`;
    return url
  }

  getCompanyImage(idCompany): string {
    //http://127.0.0.1:8080/MBNWs/rs/companyExt/companyImage/9fddcbf1-f894-404a-935d-eec019aad1b6/main
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}companyExt/companyImage/${idCompany}/main`;
    return url;
  }
}
