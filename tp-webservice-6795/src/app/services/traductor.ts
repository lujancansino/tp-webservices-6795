import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraductorServices {

  constructor(private http: HttpClient) {

  }
  getlanguages():Observable<any>{ 
   //Establecemos las opciones de la cabecera HTTP, incluyendo el tipo de contenido y la clave de API
   //osea, la información que se envía al servidor para autenticar la solicitud y especificar el formato de los datos.
   //en simples palabras, es como la "identificación" que le decimos al servidor para que nos permita acceder a la información que queremos obtener.
   //el let httpoption es un objeto que contiene la configuración de las cabeceras HTTP, que se utiliza para enviar información adicional al servidor en una solicitud HTTP. 
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'c9cb1cc800msh40ea79b3b9b2468p1ce865jsn7517d83e2838',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com',
      })
    };
    return this.http.get('https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages', httpOptions); // Realizamos la solicitud HTTP GET a la API de traducción utilizando el cliente HTTP de Angular, pasando la URL y las opciones de cabecera configuradas. 
    
  }
}

