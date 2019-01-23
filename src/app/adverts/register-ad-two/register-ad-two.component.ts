import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Constants } from '../../utils/constants'
import { AuthService } from '../../shared/auth/auth.service';
import Swall from "sweetalert2";
import { StorageUtils } from '../../utils/storage-utils';


@Component({
  selector: 'app-register-ad-two',
  templateUrl: './register-ad-two.component.html',
  styleUrls: ['./register-ad-two.component.scss']
})
export class RegisterAdTwoComponent implements OnInit {

  form: FormGroup;

  constructor(private storage: StorageUtils,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      desc: this.fb.control('', [Validators.required]),
      detail: this.fb.control('', [Validators.required]),
    })
  }

}
