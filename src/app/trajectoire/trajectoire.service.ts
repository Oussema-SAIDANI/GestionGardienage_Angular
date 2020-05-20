import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trajectoire } from '../models/Trajectoire';
import { Observable } from 'rxjs';
import { Emplacement } from '../models/Emplacement';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};


@Injectable({
  providedIn: 'root'
})
export class TrajectoireService {

  constructor(private http: HttpClient) { }

  getTrajectoire() {
    return this.http.get<Trajectoire[]>('http://localhost:8080/trajectoire/all');
  }
  addAgent( trajectoire): Observable<any> {
    return this.http.post<Trajectoire>('http://localhost:8080/trajectoire/add' , trajectoire  ) ;
}
public deleteTrajectoire(trajectoire) {
  return this.http.delete<Trajectoire>('http://localhost:8080/trajectoire/delete' + '/' + trajectoire.id);
}
public updateTrajectoire(trajectoire): Observable<any> {
  return this.http.put<Trajectoire>('http://localhost:8080/trajectoire/update/' + trajectoire.id, trajectoire, httpOptions);

}
///////////////////////////////////////////////////////////////////////////////////////////////
getAllEmplacements() {
  return this.http.get<Emplacement[]>('http://localhost:8080/emplacement/all');
}

afficherByName(nom: string): Observable<any>{
  return this.http.get('http://localhost:8080/emplacement' + '/' + nom);
}
}
