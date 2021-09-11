import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage:string = '';
  validationMessage = {
    email: [
      {type: "required", message: "Email requerido"},
      {type: "pattern", message: "Email no válido"}
    ],
    password: [
      {type: "required", message: "Contraseña requerido"},
      {type: "minlength", message: "La contraseña debe tener mas de 5 caracteres"}
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  ngOnInit() {
  }

  loginUser(credentials){
    this.auth.loginUser(credentials).then(resolve => {
      if (resolve) {
        this.errorMessage = "";
        this.storage.set("isUserloggedIn",true);
        this.navCtrl.navigateForward(['/menu/home']);
      }
    }).catch(error => {
      this.errorMessage = "USUARIO O CONTRASEÑA INCORRECTOS";
    });
  }

  goToRegister(){
    this.navCtrl.navigateForward(['/register']);
  }

}
