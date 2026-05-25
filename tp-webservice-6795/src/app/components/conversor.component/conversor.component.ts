import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ConversorService } from '../../services/conversor.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Lo agregamos acá también
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {
// Variables para la lista de monedas
  listaMonedas: Array<{codigo: string, nombre: string}> = [];
  cargandoMonedas: boolean = true;

  // Variables del conversor
  monto: number = 1000;
  monedaOrigen: string = 'USD';
  monedaDestino: string = 'ARS';
  
  // Variables para la vista
  resultadoFinal: number | null = null;
  cargando: boolean = false;

  constructor(private conversorService: ConversorService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarListaMonedas();
  }

cargarListaMonedas() {
    this.conversorService.obtenerMonedas().subscribe(
      (data: any) => {
        if (data && data.success) {
          // Transformamos el objeto gigante en un Array limpio
          this.listaMonedas = Object.keys(data.currencies).map(key => {
            return {
              codigo: key,
              nombre: data.currencies[key]
            };
          });
          this.cargandoMonedas = false;
          this.cdr.markForCheck();
        }
      },
      (error: any) => {
        console.error("Error cargando la lista de monedas:", error);
        this.cargandoMonedas = false;
        this.cdr.markForCheck();
      }
    );
  }
  
  convertir() {
    if (!this.monto || this.monto <= 0) {
      alert("Por favor, ingresá un monto mayor a cero.");
      return;
    }

    this.cargando = true;
    this.resultadoFinal = null;
    this.cdr.markForCheck(); // Avisamos que empezó a cargar

    this.conversorService.convertirDivisa(this.monedaOrigen, this.monedaDestino, this.monto).subscribe(
      (data: any) => {
        // APILayer devuelve "success: true" y el resultado en "result"
        if (data && data.success) {
          this.resultadoFinal = data.result;
        } else {
          alert("Ocurrió un error en la conversión. Revisá los datos.");
        }
        
        this.cargando = false;
        this.cdr.markForCheck(); // Avisamos que ya tenemos el resultado
      },
      (error: any) => {
        console.error("Error en la API:", error);
        alert("Error de conexión. Es posible que te hayas quedado sin tokens de API.");
        this.cargando = false;
        this.cdr.markForCheck();
      }
    );
  }
}