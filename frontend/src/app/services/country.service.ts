import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de países
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      retry(3), // Reintenta hasta 3 veces
      catchError((error) => {
        console.error('Error al obtener países:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }
}
