import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Emplacement } from '../models/Emplacement';
import { Observable } from 'rxjs';
import { Beacon } from '../models/Beacon';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class CrudEmpService {

  constructor(private http: HttpClient) { }
  getEmplacement() {
    return this.http.get<Emplacement[]>('http://localhost:8080/emplacement/all');
  }
  public deleteEmplacement(emplacement) {
    return this.http.delete<Emplacement>('http://localhost:8080/emplacement/delete' + '/' + emplacement.id);
  }
  addEmplacement( emplacement): Observable<any> {
    return this.http.post<Emplacement>('http://localhost:8080/emplacement/add' , emplacement  ) ;
}
getAllBeacons() {
  return this.http.get<Beacon[]>('http://localhost:8080/beacon/all');
}
public updateEmplacement(emplacement): Observable<any> {
  return this.http.put<Beacon>('http://localhost:8080/emplacement/update/' + emplacement.id, emplacement, httpOptions);

}
}
