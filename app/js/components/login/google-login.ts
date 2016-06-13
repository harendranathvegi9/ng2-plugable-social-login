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
    window.ggAsyncInit = {
      apiKey: loginMethod.param1,
      clientId: loginMethod.param2
    }

    var ggloginInst = this;
    window.handleGGClientLoad = function(){
      if (!window.googleLoginInstance){
        setTimeout(window.handleGGClientLoad, 10);
         window.googleLoginInstance = ggloginInst;
         console.log("apiKey" + window.ggAsyncInit.apiKey);
         gapi.client.setApiKey(window.ggAsyncInit.apiKey);
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
    // if (!this.apiKeyset){
    //     window.setTimeout(this.login, 10);
    // }
    console.log('in GG.login');
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
          console.log("error");
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

    // this.apiKeyset = true;
    window.setTimeout(this.checkGGAuth, 1);
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
