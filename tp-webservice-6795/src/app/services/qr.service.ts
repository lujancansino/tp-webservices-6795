import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private http: HttpClient) { }

  public generarQR(texto: string): Observable<Blob> {
    // encodeURIComponent asegura que si ponés espacios o caracteres raros, la URL no se rompa
    const textoSeguro = encodeURIComponent(texto);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${textoSeguro}`;
    
    // Lo pedimos como 'blob' (archivo binario) para poder transformarlo a Base-64 nosotros mismos
    return this.http.get(url, { responseType: 'blob' });
  }
}