import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiUrl = 'http://localhost:8084/api/movimientos';

  constructor(private http: HttpClient) { }

  listarMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.apiUrl);
  }

  registrarEntrada(autoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/entrada/${autoId}`, {}, { responseType: 'text' });
  }

  registrarSalida(autoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/salida/${autoId}`, {}, { responseType: 'text' });
  }

  verCapacidad(): Observable<any> {
    return this.http.get(`${this.apiUrl}/capacidad`, { responseType: 'text' });
  }
}
