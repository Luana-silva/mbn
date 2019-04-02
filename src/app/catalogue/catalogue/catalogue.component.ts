import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import Swall from "sweetalert2";
import { CatalogueService } from '../catalogue.service';
import { Constants } from '../../utils/constants';
import { Search } from '../search/search';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  @ViewChildren('language') languages: QueryList<ElementRef>;

  search: Search;

  filters: any[] = [];

  listLanguage: any[] = [];

  listReference: any[] = [];

  //this.languages: any[] = [];

  listPrice: any[] = [
    { id: 1, name: 'Menor preço', selected: false, condition: false },
    { id: 2, name: 'Maior preço', selected: false, condition: true }
  ]

  listTerm: any[] = [
    { id: 3, name: 'Menor prazo', selected: false, condition: false},
    { id: 4, name: 'Maior prazo', selected: false, condition: true}
  ]


serviceList: any[] = [];

  constructor(private catalogueService: CatalogueService,
              private fb: FormBuilder) { }

  ngOnInit() {

   // this.teste2();

    this.search = new Search();

    this.search.page = 1;
    this.search.lowPrice = null;
    this.search.executionTime = null;


    this.catalogueService.loadServices(this.search).subscribe(services => {
    console.log(services);
    this.serviceList = services['data'].serviceList;
  })

    this.loadLanguages();

    this.loadReferences();

    document.documentElement.scrollTop = 0;

  }

loadLanguages() {
  this.catalogueService.loadLanguages()
    .subscribe(response => {
      this.listLanguage = response['data'];
    })
}

loadReferences() {
  this.catalogueService.loadReferences()
    .subscribe(response => {
      this.listReference = response['data'];
    })
}

teste2() {
  console.log('languages', this.languages)
}

setClass(event) {
  console.log(event.target)
  event.target.classList.toggle('selected')
}

addFilters(filter) {

    let isExisting = !this.filters.some(t => t.id == filter.id);

    if(isExisting) {
      this.filters.push(filter);
    } else {
     this.filters = this.filters.filter(t => t.id != filter.id)
   }

  }

  removeFilter(filter) {
    console.log(filter);
    if(filter.hasOwnProperty('select')) {
      filter.select = false;
    }
    console.log(filter);
    this.filters = this.filters.filter(t => t.id != filter.id)
  }

   parseFilter() {
   let languages = this.filters.filter((f) => f.hasOwnProperty('value')).length > 0 ?  this.filters.filter((f) => f.hasOwnProperty('value'))  : null;
   let references = this.filters.filter((f) => f.hasOwnProperty('desc')).length > 0 ?  this.filters.filter((f) => f.hasOwnProperty('desc'))  : null;


    let price = this.resultCondition(this.filters);
    //let conditionDelivery = this.resultConditionDelivery(this.filters);

        this.search.page = 1;
        this.search.lowPrice = price;
        this.search.executionTime = null;
        this.search.languages = languages;
        this.search.references = references;

        this.catalogueService.loadServices(this.search).subscribe(services => {
        console.log(services);
        this.serviceList = services['data'].serviceList;
      })

      console.log(this.search);

  }

  checkCondition(listFilter, conditionName) {
  	return listFilter.some(t => t.name == conditionName);
  }


  resultCondition(listFilter) {
  	let smaller = this.checkCondition(listFilter, 'Menor preço') ? this.checkCondition(listFilter, 'Maior preço') : null;
    let bigger = this.checkCondition(listFilter, 'Maior preço')  ? this.checkCondition(listFilter, 'Maior preço') : null;

    let condition;

    if(bigger && !smaller) {
    	condition = true;
    }
    else if(!bigger && smaller) {
    	condition = false;
    }
    else if(bigger && smaller) {
    	condition = null;
    }
    else if(!bigger && !smaller) {
    	condition = null;
    }

    return condition;
}

getImageServicesFeatured(id: string, idGalery: string) {
  let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}service/image/${id}/${idGalery}`

  return url;
}

  teste() {
    Swall('Erro', 'Funcionalidade ainda não implementada', 'error')
  }
}
