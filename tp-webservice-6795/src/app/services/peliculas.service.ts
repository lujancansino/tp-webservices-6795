import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) {}

  public getPeliculas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
        'x-rapidapi-key': '0a94c41e57mshd0b6cec026ea39dp1f10e7jsn570409791d0d',
        'Content-Type': 'application/json'
      })
    };

    // Hacemos la petición GET a la URL de la API
    return this.http.get("https://imdb-top-100-movies.p.rapidapi.com/", httpOptions);
  }
}