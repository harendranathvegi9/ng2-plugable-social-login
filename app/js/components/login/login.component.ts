import {Component, OnInit} from 'angular2/core';
import {LoginService} from './login.service';
import {SocialLonginService, LoginMethod} from '../../services/social-login-config.service';

@Component({
  selector: 'login',
  templateUrl: 'app/html/components/login/login.component.html',
})
export class LoginComponent implements OnInit{
  loginMethods: LoginMethod[];
  constructor(private loginService: LoginService){

  }
  ngOnInit() {
    this.loginService.loginMethods().then(lm => {
      this.loginMethods = lm
    });
  }
  onLogin(loginType: string){
    this.loginService.login(loginType).then(token=>{
      console.log(token);
    });
  }
}
