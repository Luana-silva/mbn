import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { CadastreService } from '../cadastre.service';

import { User } from './user/user';

@Component({
  selector: 'app-register-cadastre',
  templateUrl: './register-cadastre.component.html',
  styleUrls: ['./register-cadastre.component.scss']
})
export class RegisterCadastreComponent implements OnInit {

  form: FormGroup;
  language: string;
  user: User;

  constructor(private fb: FormBuilder,
              private router: Router,
              private cadastreService: CadastreService) { }


  ngOnInit() {

  const parseLanguage = navigator.language.replace('-', '_');

  this.user = new User();

  if(parseLanguage.length == 2) {
    if(parseLanguage == 'pt') {
      this.user.language = 'pt_br';
    } else {
      this.user.language = 'en_us'
    }
  } else {
    this.user.language = parseLanguage;
  }


   //swal('Erro', 'Campo inválido, verifique e tente novamente', 'success')

   this.form = this.fb.group({
     name: this.fb.control(this.user.name, [Validators.required]),
     email: this.fb.control(this.user.email, [Validators.required, Validators.email]),
     password: this.fb.control(this.user.password, [Validators.required]),
     passwordConfirmation: this.fb.control('', [Validators.required])
   }, { validator: RegisterCadastreComponent.equalsTo})

  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation')

    if(!password || !passwordConfirmation) {
      return undefined;
    }

    if(password.value !== passwordConfirmation.value) {
      return { passwordsNotMatch: true}
    }

    return undefined;
  }

  createUser() {
    this.cadastreService.createUser(this.user)
      .subscribe(user => {
        if(user['success']) {
          swal('success', 'Cadastro realizado com sucesso, faça login e comece a utilizar nossos serviços', 'success')
          .then((result) => {
           if (result.value) {
             this.router.navigate(['/login'])
           }
          })
        } else {
            if(user['desc'] == 'email_exists') {
              swal('Erro', 'Este email já está cadastrado, use outro e tente novamente', 'error')
            } else {
              swal('Erro', 'Não foi possível realizar o cadastro, verifique e tente novamente', 'error')
            }

          }
       })
  }
}
