import {Component} from 'angular2/core';
import { LoginDialogComponent } from './js/components/login/login-dialog.component';
import { LoginService } from './js/components/login/login.service';
import {SocialLonginService} from './js/services/social-login-config.service';
@Component({
    selector: 'my-app',
    template: `<h1>ng2-plugable-social-login</h1><a (click)="onLogin()" [hidden]='isLoggedIn'>login</a>
    <a (click)="onLogout()" [hidden]='!isLoggedIn'>logout</a>
    <login-dialog dialogId="loginDlg"></login-dialog>`,
    directives: [LoginDialogComponent],
    providers: [LoginService, SocialLonginService]
})
export class AppComponent {
  onLogin(){
      $('#loginDlg').modal();
    }
}
