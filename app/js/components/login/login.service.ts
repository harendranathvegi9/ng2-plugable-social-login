import { Injectable, NgZone } from 'angular2/core';
import {Login} from './login';
import {LoginToken, LoginMethod, SocialLonginService} from '../../services/social-login-config.service';

@Injectable()
export class LoginService{
  constructor(private socialLonginService: SocialLonginService){

  }
  isLoggedIn(): Promise<LoginToken>{
    return new Promise<LoginToken>((resolve, reject)=>{
      this.loginMethods().then(loginMethods=>{
        for(let loginMethod of loginMethods){
          this.loadLoginMethod(loginMethod).then(l => {
            resolve(l.isLoggedin());
          });
        }
      });
    });
  }
  login(loginType: string): Promise<LoginToken>{
    return new Promise<LoginToken>((resolve, reject) =>{
      this.loginMethods().then(loginMethods=>{
        let hasLoginMethod = false;
        for(let loginMethod of loginMethods){
          if (loginType === loginMethod.loginType){
            hasLoginMethod = true;
            this.loadLoginMethod(loginMethod).then(l => {
              l.login().then(loginToken => {resolve(loginToken);});
            });
          }
        }
        if (!hasLoginMethod){
          reject("no such login method has configured.")
        }
      });
    });
  }
  loginMethods(): Promise<Array<LoginMethod>>{
    return this.socialLonginService.listLoginMethods();
  }
  private loadLoginMethod(loginMethod: LoginMethod): Promise<Login>{
    return new Promise<Login>((resolve, reject)=>{
      System.import(loginMethod.classFilePath).then(module=>{
        let login = <Login> (new module[loginMethod.className]());
        login.init(loginMethod);
        console.log(login);
        resolve(login);
      });
    })
  }

}
