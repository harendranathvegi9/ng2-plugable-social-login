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
    "param1": "<apiKey>",
    "param2": "<clientId>",
    "param3": "",
    "param4": "",
    "param5": ""
  }
];
