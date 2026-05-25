import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { AutosService } from '../../services/autos.service';
import { Auto } from '../../models/autos';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  marcas: Array<Auto> = [];
  modelosSeleccionados: Array<Auto> = [];
  marcaActual: string = '';

  constructor(private autosService: AutosService, private cdr: ChangeDetectorRef) {
    this.cargarMarcas();
  }

  ngOnInit(): void {}

  cargarMarcas() {
    this.autosService.getMarcas().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.marcas = data;
          // estamos forzando la detección de cambios después de actualizar las marcas
          // esto es necesario porque la actualización de las marcas ocurre dentro de una suscripción asíncrona, y Angular no detecta automáticamente los cambios en este caso
          this.cdr.markForCheck(); 
        }
      },
      (error: any) => {
        console.error("Error de conexión:", error);
      }
    );
  }

  verModelos(marca: Auto) {
    if (!marca || !marca.name) return;

    this.marcaActual = marca.name; 
    this.modelosSeleccionados = []; 
    
    // aqui forzamos la detección de cambios para asegurarnos de que la interfaz de usuario se actualice inmediatamente después de limpiar los modelos seleccionados y antes de realizar la nueva solicitud para obtener los modelos de la marca seleccionada. Esto es importante para que el usuario vea que se ha seleccionado una nueva marca y que los modelos anteriores han sido limpiados antes de mostrar los nuevos modelos. Sin esta llamada a markForCheck(), la interfaz podría no reflejar estos cambios hasta que Angular detecte automáticamente los cambios en el ciclo de vida, lo que podría causar una experiencia de usuario menos fluida.
    this.cdr.markForCheck(); 

    this.autosService.getModelosPorMarca(marca.id).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.modelosSeleccionados = data; 
          // estamos forzando la detección de cambios después de actualizar los modelos seleccionados
          // esto es necesario porque la actualización de los modelos ocurre dentro de una suscripción asíncrona, y Angular no detecta automáticamente los cambios en este caso
          this.cdr.markForCheck(); 
        } else if (data && data.message) {
          alert("RAPID-API DICE: " + data.message);
        }
      },
      (error: any) => {
        console.error("Error al buscar modelos:", error);
      }
    );
  }
}