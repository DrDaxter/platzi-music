import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  credentials = [];
  constructor(
    private storage: Storage,
  ) { }

  loginUser(user){
    return new Promise(async (resolve,reject) => {
      this.credentials = await this.storage.get('user');
      user.password = btoa(user.password);
      if (user.email == this.credentials['email'] && user.password == this.credentials['password']) {
        resolve(true);
      }else{
        reject("Error de registro");
      }
    });
  }

  registerUser(user){
    user.password = btoa(user.password);
    return this.storage.set('user',user);
  }
}
