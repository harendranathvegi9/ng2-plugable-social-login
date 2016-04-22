import {Login} from './login';
import {LoginToken, LoginMethod} from '../../services/social-login-config.service';
declare var window: any;
var gapi: any;
const GAPI_URL = "https://apis.google.com/js/client.js";
const GAPI_SCOPES = 'https://www.googleapis.com/auth/userinfo.profile';

// interface People{
//   get(param: any): any;
// }
//
// namespace gapi.client {
//   export var people: People;
// }




export class GoogleLogin implements Login{
  init(loginMethod: LoginMethod): void{
    window.handleGGClientLoad = function(){
      if (!window.googleLoginInstance){
        setTimeout(window.handleGGClientLoad, 10);
      } else {
        window.googleLoginInstance.handleGGClientLoad();
      }
    };
    (function(d: Document, s: string, id: string, cb: string) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = GAPI_URL + "?onload=" + cb;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'gapi_auth', 'handleGGClientLoad');
  }
  login(): Promise<LoginToken>{
    console.log('in FB.login');
    return new Promise<LoginToken>((resolve, reject)=>{
      gapi.auth.authorize({client_id: window.ggAsyncInit.clientId, scope: GAPI_SCOPES, immediate: true}, authResult => {
        if (authResult && !authResult.error) {
          console.log(authResult);
          gapi.client.load('plus', 'v1', function() {
            var request = gapi.client.plus.people.get({
              'userId': 'me'
            });
            request.execute(function(resp) {
              console.log(resp);
            });
          });
        } else {
          reject("User cancelled or not provide enough permission.")
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

  handleGGClientLoad(){
    this.checkGGAuth();
  }

  private handleGGAuthResult(authResult: any){
    if (authResult && !authResult.error) {
      console.log(authResult);
      this.fetchUserInfo();
      // this.fetchGGAuthInfo();
    } else {
      console.log("error.....")
    }
  }

  private fetchUserInfo(){
    gapi.client.load('plus', 'v1', function() {
      var request = gapi.client.plus.people.get({
        'userId': 'me'
      });
      request.execute(function(resp) {
        console.log(resp);
      });
    });
  }

  private checkGGAuth() {
    gapi.auth.authorize({client_id: window.ggAsyncInit.clientId, scope: GAPI_SCOPES, immediate: true}, this.handleGGAuthResult);
  }
}
