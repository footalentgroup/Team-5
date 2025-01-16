import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://ftg-team5.vercel.app/api/search';

  constructor(private http: HttpClient) {}

  search(query: string, types: string[]): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('types', types.join(',')); // Concatena los tipos seleccionados
    return this.http.get<any>(this.apiUrl, { params });
  }
}
