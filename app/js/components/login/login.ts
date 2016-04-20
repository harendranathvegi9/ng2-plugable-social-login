import {LoginToken, LoginMethod} from '../../services/social-login-config.service';

export interface Login{
  init(loginMethod: LoginMethod): void;
  login(): Promise<LoginToken>;
  logout(): Promise<boolean>;
  isLoggedin(): Promise<LoginToken>;
}
