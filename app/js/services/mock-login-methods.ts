import {LoginMethod} from './social-login-config.service';

export var LOGINMETHODS: LoginMethod[] = [
  {
    "loginType": "facebook",
    "buttonText": "Sign in with Facebook",
    "buttonStyle": "btn-facebook",
    "buttonFontStyle": "fa-facebook",
    "classFilePath": "app/js/components/login/facebook-login",
    "className": "FacebookLogin",
    "param1": "<appid>",
    "param2": "",
    "param3": "",
    "param4": "",
    "param5": ""
  },
  {
    "loginType": "pin",
    "buttonText": "Sign in with Pinterest",
    "buttonStyle": "btn-pinterest",
    "buttonFontStyle": "fa-pinterest",
    "classFilePath": "app/js/components/login/pin-login",
    "className": "PinLogin",
    "param1": "<appid>",
    "param2": "",
    "param3": "",
    "param4": "",
    "param5": ""
  },
  {
    "loginType": "google",
    "buttonText": "Sign in with Google",
    "buttonStyle": "btn-google",
    "buttonFontStyle": "fa-google",
    "classFilePath": "app/js/components/login/google-login",
    "className": "GoogleLogin",
    "param1": "AIzaSyBW2cBGkzi0rsGtjFsBI_lDPzAsfLD9LWU",
    "param2": "547875598366-g1u6taco4f9cqr5r6a3spcss5ja32rue.apps.googleusercontent.com",
    "param3": "",
    "param4": "",
    "param5": ""
  }
];
