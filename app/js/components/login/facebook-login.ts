import {Login} from './login';
import {LoginToken, LoginMethod} from '../../services/social-login-config.service';

export class FacebookLogin implements Login{
  init(loginMethod: LoginMethod): void{

  }
  login(): Promise<LoginToken>{
    console.log('in FB.login');
    return new Promise<LoginToken>((resolve, reject)=>{
      FB.login((response) => {
        console.log('fb login callback');
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
       }
      }, {scope: 'email,user_likes', return_scopes: true});
    });
  }
  logout(): Promise<boolean>{
      return new Promise<boolean>((resolve, reject)=>{
        resolve(true);
      });
  }
  isLoggedin(): Promise<LoginToken>{
    return new Promise<LoginToken>((resolve, reject)=>{

    });
  }
}
