import { Component } from '@angular/core';
import { TraductorServices } from '../../services/traductor';
@Component({
  selector: 'app-traductor',
  standalone: true,
  imports: [],
  templateUrl: './traductor.html',
  styleUrl: './traductor.css',
})
export class TraductorComponent {

  constructor(private TraductorServices: TraductorServices) {}

  obtenerlenguajes() {
    this.TraductorServices.getlanguages().subscribe(
      (result: any) => {
        console.log(result);
      },
      (error: any) => {
        console.error('Error al obtener los idiomas:', error);
      }
    );
  }
}
