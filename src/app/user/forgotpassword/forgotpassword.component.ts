import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import Swall from "sweetalert2";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  form: FormGroup

  ngOnInit() {

    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email])
    })
  }
  
  onSubmit() {
    if(this.form.valid) {
      this.authService.forgotPassword(this.form.value.email)
        .subscribe(response => {
         if(response['success']) {
           Swall('sucesso', 'Enviamos um link para o seu email, siga os passos indicados nele', 'success')
           .then((result) => {
            if (result.value) {
              this.router.navigate(['/'])
            }
           })
         } else {
          if(response['desc'] == 'user_not_found') {
            Swall('Erro', 'Usuário não encontrado, verifique e tente novamente ou se cadastre em nosso site', 'error')
           }
         }
        })
    } else {
      Swall('Erro', 'Campo inválido, verifique e tente novamente', 'error')
    }
  }
}
