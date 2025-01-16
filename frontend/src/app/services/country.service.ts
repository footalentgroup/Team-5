import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs'; 
import { catchError, retry } from 'rxjs'; 

@Injectable({
  providedIn: 'root', // Se declara que el servicio será proporcionado de manera global en toda la aplicación.
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all'; // URL de la API para obtener la lista de países.

  constructor(private http: HttpClient) {} // Se inyecta el servicio HttpClient para realizar solicitudes HTTP.

  // Método para obtener la lista de países
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl) // Realiza una solicitud HTTP GET a la URL definida para obtener la lista de países.
      .pipe(
        retry(3), // En caso de error, se reintenta la solicitud hasta 3 veces.
        catchError((error) => {
          console.error('Error al obtener países:', error); // Si ocurre un error, se muestra en la consola.
          return of([]); // Devuelve un array vacío como fallback en caso de error.
        })
      );
  }
}
