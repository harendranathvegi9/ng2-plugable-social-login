import {Injectable} from 'angular2/core';
import {LOGINMETHODS} from './mock-login-methods';

export class LoginMethod{
  // differenciate the type of login, e.g. facebook
  loginType: string;
  // text on the button
  buttonText: string;
  // button style class, e.g. btn-facebook
  buttonStyle: string
  // button font style, e.g. fa-facebook
  buttonFontStyle: string;
  // path of js file
  classFilePath: string;
  // name of class
  className: string;
  // parameter 1
  param1: string;
  // parameter 2
  param2: string;
  // parameter 3
  param3: string;
  // parameter 4
  param4: string;
  // parameter 5
  param5: string;
}

export class LoginToken{
  constructor(public loginType: string, public uid: string, public token: string){

  }

  static fromJson(json: string){
    var data = JSON.parse(json);
    return new LoginToken(data.loginType, data.uid, data.token);
  }

  public toString(): string{
    return JSON.stringify(this);
  }
}

@Injectable()
export class SocialLonginService{
  public listLoginMethods(): Promise<Array<LoginMethod>>{
    return new Promise<Array<LoginMethod>>((resolve, reject)=>{
      resolve(LOGINMETHODS);
    });

  }
}
