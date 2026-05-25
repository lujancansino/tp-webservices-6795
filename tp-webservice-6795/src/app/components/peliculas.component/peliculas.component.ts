import { Component, OnInit } from '@angular/core';

// Subimos dos niveles (../../) para salir de la carpeta del componente y entrar a models/ y services/
import { Pelicula } from '../../models/peliculas'; 
import { PeliculasService } from '../../services/peliculas.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  
  peliculas: Array<Pelicula> = [];

  constructor(private peliculasService: PeliculasService) {
    this.cargarPeliculas();
  }

  ngOnInit(): void {}

  cargarPeliculas() {
    this.peliculasService.getPeliculas().subscribe(
      (result: any) => {
        this.peliculas = new Array<Pelicula>();
        
        result.forEach((element: any) => {
          let peli = new Pelicula();
          Object.assign(peli, element);
          this.peliculas.push(peli);
        });

        console.log("Películas cargadas:", this.peliculas);
      },
      // Solución al error TS7006: declaramos explícitamente el tipo de la variable error
      (error: any) => { 
        console.error("Error en la petición", error); 
        alert("Hubo un error al cargar las películas");
      }
    );
  }
}