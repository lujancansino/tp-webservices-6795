import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {

  constructor(private http: HttpClient) { }

  public getMarcas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'car-specs.p.rapidapi.com',
        'x-rapidapi-key': '0a94c41e57mshd0b6cec026ea39dp1f10e7jsn570409791d0d',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get("https://car-specs.p.rapidapi.com/v2/cars/makes", httpOptions);
  }

  public getModelosPorMarca(makeId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'car-specs.p.rapidapi.com',
        'x-rapidapi-key': '0a94c41e57mshd0b6cec026ea39dp1f10e7jsn570409791d0d',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(`https://car-specs.p.rapidapi.com/v2/cars/makes/${makeId}/models`, httpOptions);
  }
}