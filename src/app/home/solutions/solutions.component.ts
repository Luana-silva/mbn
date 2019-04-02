import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Constants } from '../../utils/constants'
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {

  solutionsTeste = Array.from({length: 12}).fill(null);
  solutions: any[] = [];

  constructor(private homeService: HomeService,
              private authService: AuthService) { }

  ngOnInit() {

    this.loadSolutions();
  }


  loadSolutions() {
    this.homeService.loadSolutions({page: 1})
      .subscribe(response => this.solutions = response['data']);
  }

  getImageServicesFeatured(id: string) {
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}category/categoryImage/${id}/main`;

    return url;
  }
}
