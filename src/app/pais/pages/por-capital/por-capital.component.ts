import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
    `
    li{
      cursor:pointer;
    }
    `
  ]
})
export class PorCapitalComponent{

  hayError: boolean = false;
  termino: string = '';
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar( termino: string ){
    
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this.paisService.buscarCapital( this.termino )
      .subscribe( (paises) => {
        this.paises = paises;
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      }
      );
  }

  sugerencias( termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarCapital( termino )
    .subscribe(
        paises => this.paisesSugeridos = paises.splice(0,5),
        (err) => this.paisesSugeridos = []
      )

  }

  buscarSugerido( termino: string ){
    this.buscar( termino );
  }
}
