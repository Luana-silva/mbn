import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-building-net';

  public routeLoading: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        this.routeLoading = true;
       // console.log('start', event.url);
      }

      if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
          this.routeLoading = false;
          //console.log(event.url);
      }
    });
  } 

  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
}
}
