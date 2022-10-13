import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { VerPaisComponent } from '../pages/ver-pais/ver-pais.component';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  //https://restcountries.com/v3.1/name/united
  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams (){
    return new HttpParams()
      .set( 'fields', 'flags,capital,name,population,cca2' )
  }

  constructor( private http: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${termino}?fields=flags,capital,name,population,cca2,ccn3,translations`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );

  }

  buscarCapital( termino: string ): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${termino}?fields=flags,capital,name,population,cca2,ccn3,translations`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );

  }

  getPaisPorAlpha( id: string ): Observable<Country> {

    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>( url );

  }

  buscarRegion( region: string): Observable<Country[]>{

    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>( url, { params: this.httpParams } )
    
  } 

}
