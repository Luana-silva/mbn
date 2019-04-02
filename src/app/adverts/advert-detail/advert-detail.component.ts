import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AdvertService } from '../advert.service';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {

  service: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertService: AdvertService) { }

  ngOnInit() {

    this.route.params.subscribe((param) => {
      console.log(param)
      let id = param['id'];

      this.loadDetailService(id);
    })

  }

  loadDetailService(id: string) {
    this.advertService.loadDetailService(id)
      .subscribe(response => {
        console.log(response['data'].serviceExt)
        this.service = response['data'];
      })
  }

  getImageServicesFeatured(id: string, idGalery: string) {
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}service/image/${id}/${idGalery}`

    return url;
  }
}
