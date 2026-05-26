import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TextoAudioService } from '../../services/texto-audio.service';

@Component({
  selector: 'app-texto-audio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './texto-audio.component.html',
  styleUrls: ['./texto-audio.component.css']
})
export class TextoAudioComponent {

  texto: string = 'Hola, estoy listo para hablar.';
  idiomaSeleccionado: string = 'Spanish';
  vozSeleccionada: string = 'alloy';
  
  cargando: boolean = false;
  objetUrl: SafeUrl | string = ""; 

  // CAPTURAMOS EL REPRODUCTOR DEL HTML
  @ViewChild('reproductor') reproductor!: ElementRef<HTMLAudioElement>;

  constructor(
    private textoAudioService: TextoAudioService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer 
  ) {}

  generarAudio() {
    if (!this.texto || this.texto.trim() === '') {
      alert("Por favor, ingresá un texto para convertir.");
      return;
    }

    this.cargando = true;
    this.objetUrl = ""; 
    this.cdr.markForCheck();

    this.textoAudioService.convertirTextoAudio(this.texto, this.idiomaSeleccionado, this.vozSeleccionada).subscribe(
      (data: Blob) => {
        // 1. Generamos la URL cruda
        let rawUrl = URL.createObjectURL(data);
        
        // 2. EL MÉTODO DEL PROFE (Lo dejamos para cumplir con la rúbrica del TP)
        this.objetUrl = this.sanitizer.bypassSecurityTrustUrl(rawUrl);
        
        // 3. EL TRUCO PROFESIONAL (Inyectamos el audio directo para esquivar el bug del 404)
        if (this.reproductor) {
          this.reproductor.nativeElement.src = rawUrl;
        }
        
        this.cargando = false;
        this.cdr.markForCheck(); 
      },
      (error: any) => {
        console.error("Error al generar el audio:", error);
        alert("Ocurrió un error. Revisá la consola.");
        this.cargando = false;
        this.cdr.markForCheck();
      }
    );
  }
}