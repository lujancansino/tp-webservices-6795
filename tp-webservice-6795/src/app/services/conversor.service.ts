import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  // La API Key que me pasaste
  private apiKey = '9vURFWp5RwjCeFPaAEQXAmvBO8EKeQ8X';

  constructor(private http: HttpClient) { }

  public obtenerMonedas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'apikey': this.apiKey
      })
    };
    return this.http.get("https://api.apilayer.com/currency_data/list", httpOptions);
  }
  // Función que recibe los 3 parámetros dinámicos
  public convertirDivisa(from: string, to: string, amount: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'apikey': this.apiKey
      })
    };
    
    return this.http.get(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`, httpOptions);
  }
}