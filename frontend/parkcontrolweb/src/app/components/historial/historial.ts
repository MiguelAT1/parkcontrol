import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MovimientoService } from '../../services/movimiento.service';
import { Movimiento } from '../../models/movimiento.model';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class Historial implements OnInit {
  movimientos: Movimiento[] = [];

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.movimientoService.listarMovimientos().subscribe({
      next: (data) => {
        // Ordenar por ID o fecha (asumiendo que el último es el más reciente)
        this.movimientos = data.sort((a, b) => {
          return (b.id || 0) - (a.id || 0);
        });
      },
      error: (err) => console.error('Error al cargar historial', err)
    });
  }
}
