import {Login} from './login';
import {LoginToken, LoginMethod} from '../../services/social-login-config.service';
declare var window: any;

export class PinLogin implements Login{
  init(loginMethod: LoginMethod): void{
    window.pAsyncInit = function() {
        PDK.init({
            appId: loginMethod.param1, // param1 used as appId
            cookie: true
        });
    };
    (function(d, s, id){
        var js, pjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//assets.pinterest.com/sdk/sdk.js";
        pjs.parentNode.insertBefore(js, pjs);
    }(document, 'script', 'pinterest-jssdk'));
  }
  login(): Promise<LoginToken>{
    console.log('in Pin.login');
    return new Promise<LoginToken>((resolve, reject)=>{
      PDK.login({scope: 'read_public,write_public,read_relationships,write_relationships'}, (response) => {
        console.log('Pin login callback');
        if (response.status == 'connected') {
         console.log('Welcome!  Fetching your information.... ');
         PDK.me( function(response) {
           console.log('Good to see you, ' + response.first_name + '.');
         });
        } else {
          reject("User cancelled login or did not fully authorize.");
         console.log('User cancelled login or did not fully authorize.');
       }
      });
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
