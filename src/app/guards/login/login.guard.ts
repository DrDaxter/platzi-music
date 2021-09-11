import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: Storage,
  ){}

  async canActivate(){
    const isUserLogin = await this.storage.get('isUserloggedIn');
    if (isUserLogin) {
      return true; 
    }else{
      this.router.navigate(['/login']);
    }
  }
  
}
