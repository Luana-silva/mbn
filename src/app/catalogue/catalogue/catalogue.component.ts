import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import Swall from "sweetalert2";
import { CatalogueService } from '../catalogue.service';
import { Constants } from '../../utils/constants'

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  /* {
    "page" : 1,
    "lowPrice" : false,
    "lowExecutionTime" : false
} */

form: FormGroup;

serviceList: any[] = [];

  constructor(private catalogueService: CatalogueService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      maior: this.fb.control(false, [Validators.required, Validators.email]),
      menor: this.fb.control(false, [Validators.required]),
    })

    this.catalogueService.loadServices({
      "page" : 1,
      "lowPrice" : false,
      "executionTime" : false
  }).subscribe(services => {
    console.log(services);
    this.serviceList = services['data'].serviceList;
  })

    document.documentElement.scrollTop = 0;

  }

filter() {
  const maior = this.form.get('maior').value;
  const menor = this.form.get('menor').value;

      if(maior) {
        this.catalogueService.loadServices({
          "page" : 1,
          "lowPrice" : true,
          "executionTime" : false
      }).subscribe(services => {
        console.log(services);
        this.serviceList = services['data'].serviceList;
      })
    }
}
getImageServicesFeatured(id: string, idGalery: string) {
  let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}service/image/${id}/${idGalery}`

  return url;
}

  teste() {
    Swall('Erro', 'Funcionalidade ainda não implementada', 'error')
  }
}
