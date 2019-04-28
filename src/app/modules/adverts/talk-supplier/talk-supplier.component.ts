import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdvertService } from '../advert.service';
import { Constants } from '../../../utils/constants';
import { StorageUtils } from '../../../utils/storage-utils';
import Swall from "sweetalert2";

@Component({
  selector: 'app-talk-supplier',
  templateUrl: './talk-supplier.component.html',
  styleUrls: ['./talk-supplier.component.scss']
})
export class TalkSupplierComponent implements OnInit {

  form: FormGroup;

  listModels: any[] = [];

  service: any = {};

  imageUser: any;

  idObj: string;

  descObj: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private advertService: AdvertService,
              private storage: StorageUtils) { }

  ngOnInit() {

    this.form = this.fb.group({
      modelOption: this.fb.control('', []),
      model: this.fb.control('', [Validators.required]),
    })
  
    this.route.params.subscribe((param) => {
      console.log(param)
      let id = param['id'];

      this.loadDetailService(id);
    })


    this.messageModel();
  }

  messageModel() {
    this.advertService.messageModel().subscribe(response => {
      this.listModels = response['data']
    })
  }

  loadDetailService(id: string) {
    this.advertService.loadDetailService(id)
      .subscribe(response => {
        this.service = response['data'];
        this.imageUser = this.getUserImage(response['data'].userCard.id)
        this.idObj = response['data'].userCard.id;
        this.descObj = response['data'].serviceExt.name
      })
  }

  getUserImage(id) {
    //http://127.0.0.1:8080/MBNWs/rs/user/userImage/ba62f9d3-fced-4114-ac93-990aa1de2a66/main
    let url = `${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/userImage/${id}/main`;
    return url
  }

  setModel() {
    let modelOption = this.form.get('modelOption').value;
    let model = this.form.get('model')

    model.setValue(modelOption.message);

    console.log(modelOption)
  }

  faqSave() {

    const message = {
      idObj : this.idObj,
      descObj : this.descObj,
      messageQuestion : {
        idUser : this.storage.getIdUser(),
        message : this.form.get('model').value
      }
    }

    this.advertService.faqSave(message)
      .subscribe(response => {
        console.log(response)

        if(response['success']) {
          Swall('Sucesso', 'Mensagem enviada com sucesso', 'success');
        } else {
          Swall('Erro', 'Não foi possível enviar a mensagem', 'success');
        }
      })
  }

}
