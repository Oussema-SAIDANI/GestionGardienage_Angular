import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private roles: string[];
   authority: string;
  constructor(private router: Router , private token: TokenStorageService) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_USER') {
          this.authority = 'user';
          return false;
        }
      });
    }
  }
  logout() {
    this.token.signOut();
    this.router.navigateByUrl('/login') ;
  }
}
