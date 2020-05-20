import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Role } from '../models/Role';
import { AuthLoginInfo } from '../auth/login-info';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css',
]
})
export class PageLoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
username: string ;
password: string ;

  constructor(private loginService: LoginService , private router: Router ,
              private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    this.roles = this.tokenStorage.getAuthorities();
    }
  }

  authenticate() {
    let user = new User() ;
    user.username=this.username ;
    user.password=this.password ;
    this.loginService.authentication(user).subscribe(
      data => {
      if(data==null || data==undefined || data =="")
      {alert('utilisateur n\'existe pas');}
      else
      {
      // if (user.roles.find.arguments('ADMIN')) {
                  this.router.navigateByUrl('/home') ;
      //  }

      //  alert('user exists');
    } },
      error => {console.log('erreur',error) ;}
      ,
      () => {console.log('done') ; }
    ) ;
  /*  console.log('username' ,this.username) ;
    console.log('password',this.password)
  ;   */}
  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {if (data == null || data == undefined) { alert('utilisateur n\'existe pas'); } else {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.roles.every(role => {
          if (role === 'ROLE_ADMIN') {
        this.router.navigateByUrl('/home') ;
        return true; } else { alert('vous n\'etes pas un adminstrateur !! '); }
      }); }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
