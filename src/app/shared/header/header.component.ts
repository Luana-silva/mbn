import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../utils/constants';
import { StorageUtils } from '../../utils/storage-utils';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
          private route: ActivatedRoute,
          private storage: StorageUtils,
          private authService: AuthService) { }

  ngOnInit() {

  }

  logged() {
    return this.storage.getToken();
  }

  logout() {
    this.authService.logout();
  }

  getName() {
	  let parseName = this.storage.getName().replace('"', '').replace('"', '')
	  return parseName;
	}
}
