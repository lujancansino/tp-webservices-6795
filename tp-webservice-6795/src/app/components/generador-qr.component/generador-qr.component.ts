import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrService } from '../../services/qr.service';

@Component({
  selector: 'app-generador-qr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generador-qr.component.html',
  styleUrls: ['./generador-qr.component.css']
})
export class GeneradorQrComponent {

  textoIngresado: string = '';
  qrBase64: string = ''; // Acá vamos a guardar el string Base-64
  cargando: boolean = false;

  constructor(private qrService: QrService, private cdr: ChangeDetectorRef) {}

  generar() {
    if (!this.textoIngresado || this.textoIngresado.trim() === '') {
      alert("Por favor, ingresá una URL o texto para generar el QR.");
      return;
    }

    this.cargando = true;
    this.qrBase64 = ''; 
    this.cdr.markForCheck();

    this.qrService.generarQR(this.textoIngresado).subscribe(
      (blob: Blob) => {
        // EL TRUCO PARA EL PROFE: Convertimos el Blob a un string Base-64
        const reader = new FileReader();
        reader.readAsDataURL(blob); // Esto hace la conversión
        
        // Cuando termina de convertir, lo guardamos en la variable
        reader.onloadend = () => {
          this.qrBase64 = reader.result as string; 
          this.cargando = false;
          this.cdr.markForCheck(); 
        };
      },
      (error: any) => {
        console.error("Error al generar QR:", error);
        alert("Ocurrió un error al generar el código.");
        this.cargando = false;
        this.cdr.markForCheck();
      }
    );
  }
}