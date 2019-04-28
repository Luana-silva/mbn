import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { StorageUtils } from '../../../utils/storage-utils';
import { User } from '../../cadastre/register-cadastre/user/user';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(private authService: AuthService,
              private fb: FormBuilder, 
              private router: Router,
              private storage: StorageUtils) { }

  ngOnInit() {
    
    this.user = new User();

    this.form = this.fb.group({
      email: this.fb.control(this.user.email, [Validators.required, Validators.email]),
      password: this.fb.control(this.user.password, [Validators.required])
    })
  }

  login() {
   if(this.form.valid) {
      this.authService.login(this.form.value.email,
        this.form.value.password)
        .subscribe(user => {
         console.log(user);

          if(user['success']) {

            this.storage.storeToken(user['data'].token);
            this.storage.storeUser(user['data']);
            this.storage.storeName(user['data'].name)
            this.storage.idUser(user['data'].id);
            this.router.navigate(['/'])
          } else {
            console.log('Usuário inválido')
            swal('Erro', 'Usuário ou senha não encontrado, verifique e tente novamente', 'error')
            // swal('Erro', 'Este usuário não foi encontrado, verifique e tente novamente', 'error')
          }
        });
    } else {
      console.log('O formulário está inválido, verifique todos os campos');
    }
  }
}
