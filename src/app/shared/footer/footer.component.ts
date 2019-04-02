import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { StorageUtils } from '../../utils/storage-utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private storage: StorageUtils) { }

  ngOnInit() {
  }

  redirectPersonal() {
    if(this.logged()) {
      this.router.navigate(['/settings']);
    }  else {
      this.router.navigate(['/login']);
    }
  }

  logged() {
    return this.storage.getToken();
  }
}