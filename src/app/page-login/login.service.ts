import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  authentication(u: User):Observable<any> {
    //console.log('dkhalna lel web service') ;
    //alert(JSON.stringify(u)) ;
    return this.http.post('http://localhost:8080/hello/verifierUser',u) ;

}
//credentials

}
