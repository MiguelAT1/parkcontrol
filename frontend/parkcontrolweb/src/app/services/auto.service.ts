import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auto } from '../models/auto.model';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  private apiUrl = 'http://localhost:8084/api/autos';

  constructor(private http: HttpClient) { }

  listarAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Auto> {
    return this.http.get<Auto>(`${this.apiUrl}/${id}`);
  }

  guardarAuto(auto: Auto, usuarioId: number): Observable<Auto> {
    return this.http.post<Auto>(`${this.apiUrl}/${usuarioId}`, auto);
  }

  actualizarAuto(id: number, auto: Auto): Observable<Auto> {
    return this.http.put<Auto>(`${this.apiUrl}/${id}`, auto);
  }

  eliminarAuto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
