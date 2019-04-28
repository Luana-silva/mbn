import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError } from  'rxjs/operators';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { NguCarouselConfig } from '@ngu/carousel';
import { HomeService } from '../home.service';
import { Constants } from '../../../utils/constants'
import { AuthService } from '../../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { StorageUtils } from '../../../utils/storage-utils';
import { Str } from '../../../utils/transform';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  @ViewChild('arrowPrev') arrowPrevEl: ElementRef
  @ViewChild('arrowNext') arrowNextEl: ElementRef
  @ViewChild('search') searchEl : ElementRef
  @ViewChild('filters') filtersEl: ElementRef;

  results: Object;
  searchTerm$ = new Subject<string>();

  solutions: any[] = [];
  servicesFeatured: any[] = [];
  ratingsFeatured: any[] = [];
  servicesFeaturedByAdmin: any[] = [];
  posts: any;

  latitude: any;
  longitude: any;

  errorLocalization: string;

  listPrice: any[] = [
    { id: 1, name: 'Menor preço', selected: false, condition: false },
    { id: 2, name: 'Maior preço', selected: false, condition: true }
  ]

  listTerm: any[] = [
    { id: 3, name: 'Menor prazo', selected: false, condition: false},
    { id: 4, name: 'Maior prazo', selected: false, condition: true}
  ]

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 2, lg: 2, all: 0 },
    slide: 1,
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    loop: true
  };

  constructor(private homeService: HomeService,
              private storage: StorageUtils,
              private authService: AuthService,
              private router: Router) { }

  testimonys: any[] = [
    { name: 'Amanda Smith', image: 'https://res-4.cloudinary.com/enjoei/image/upload/c_fill,fl_lossy.progressive,h_90,w_90/cuu2fmpqd5fdabrfspxm', testimony: 'Lorem ipsum dolor amtsu...', project: 'Projeto arquitetônico  - House II'},
    { name: 'Vanessa souza', image: 'https://res-4.cloudinary.com/enjoei/image/upload/c_fill,fl_lossy.progressive,h_90,w_90/usuario_avatar_5861783_1470857755', testimony: 'Lorem ipsum dolor amtsu...', project: 'Consultoria fachadas - Abs'},
    { name: 'Vanessa souza', image: 'https://res-4.cloudinary.com/enjoei/image/upload/c_fill,fl_lossy.progressive,h_90,w_90/usuario_avatar_5861783_1470857755', testimony: 'Lorem ipsum dolor amtsu...', project: 'Consultoria fachadas - Abs'},
    { name: 'Vanessa souza', image: 'https://res-4.cloudinary.com/enjoei/image/upload/c_fill,fl_lossy.progressive,h_90,w_90/usuario_avatar_5861783_1470857755', testimony: 'Lorem ipsum dolor amtsu...', project: 'Consultoria fachadas - Abs'}
  ]

  ngOnInit() {

    this.loadHome();


    
    this.getLocalization();

      this.homeService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results;
      });


      this.loadPosts();
  }

  getLocalization() {
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;

                    if(this.latitude && this.longitude) {
                      this.loadHomeLocalization(this.latitude, this.longitude);
                    }

                    console.log('latitude', this.latitude)
                    console.log('longitude', this.longitude)
            },
            error => {
              console.log('error localization', error)
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        this.errorLocalization = 'Permission Denied';
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        this.errorLocalization = 'Position Unavailable';
                        break;
                    case 3:
                        console.log('Timeout');
                        this.errorLocalization = 'Timeout'
                        break;
                }

                this.loadHome();
            }
        );

        console.log('Erro de localização', this.errorLocalization)

    };
  }

loadHome() {
  this.homeService.loadHome()
    .subscribe(response => {
      console.log(response);
      this.solutions = response['data'].solutions;
      this.servicesFeatured = response['data'].servicesFeatured;
      this.ratingsFeatured = response['data'].ratingsFeatured;
      this.servicesFeaturedByAdmin = response['data'].servicesFeaturedByAdmin
    })
}

loadHomeLocalization(latitude, longitude) {
    this.homeService.loadHomeLocalization(latitude, longitude)
      .subscribe(response => {
        console.log(response);
        this.solutions = response['data'].solutions;
        this.servicesFeatured = response['data'].servicesFeatured;
        this.ratingsFeatured = response['data'].ratingsFeatured;
        this.servicesFeaturedByAdmin = response['data'].servicesFeaturedByAdmin
      })
}

getImageSolution(id: string) {
  let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}category/categoryImage/${id}/main`;
    return url;
}

getImageServicesFeatured(id: string, idGalery: string) {
  let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}service/image/${id}/${idGalery}`

  return url;
}


handleArrowPrev() {
  this.arrowPrevEl.nativeElement.click();
}

handleArrowNext() {
  this.arrowNextEl.nativeElement.click();
}

logged() {
    return this.storage.getToken();
  }

getName() {
  let parseName = this.storage.getName().replace('"', '').replace('"', '');
  return parseName;
}

logout() {
  this.authService.logout();
 }

loadPosts() {
  this.homeService.loadPosts()
    .subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    })
}

goToCatalogue(name) {
  const nome = Str.transformStr(name);
  console.log(nome);

  this.router.navigate(['/catalogue', nome]);
}

searchHome() {
  let search = this.searchEl.nativeElement;

  if(search.value.length > 3) {
    const nome = Str.transformStr(search.value)
    this.router.navigate(['/catalogue', nome]);
  } else {
    // do something
  }
}

openFilters() {
  console.log('Filtros da home')
  this.filtersEl.nativeElement.classList.add('active');
}

closeFilters() {
  this.filtersEl.nativeElement.style.display = 'none';


  setTimeout(() => {
    this.filtersEl.nativeElement.classList.remove('active');
    this.filtersEl.nativeElement.style.display = 'flex';
  }, 1000)
}

setQueryParameters() {
 // this.router.navigate([this.router.url.split('?')[0]], {queryParams: {'pagina': "teste"}})
}

setQueryParameters2() {
 // this.router.navigate([this.router.url.split('?')[0]], {queryParams: {'segundo': "teste"}})
}
}
