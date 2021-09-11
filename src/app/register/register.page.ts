import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage:string = '';
  validationMessage = {
    nombre: [
      {type: "required", message: "Nombre requerido"}
    ],
    apellido: [
      {type: "required", message: "Apellido requerido"}
    ],
    email: [
      {type: "required", message: "Email requerido"},
      {type: "pattern", message: "Email no válido"}
    ],
    password: [
      {type: "required", message: "Contraseña requerido"},
      {type: "minlength", message: "La contraseña debe tener mas de 5 caracteres"}
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage,
    private auth: AuthenticateService,
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      apellido: new FormControl("", Validators.compose([
        Validators.required
      ])),
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ])),
      password: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
   }

  ngOnInit() {
  }


  registerUser(user){
    this.auth.registerUser(user).then(() => {
      this.navCtrl.navigateForward(['/login']);
    })
  }

  goToLogin(){
    this.navCtrl.navigateBack(['/login']);
  }
}
