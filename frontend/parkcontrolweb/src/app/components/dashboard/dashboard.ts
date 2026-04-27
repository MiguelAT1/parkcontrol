import { Component, OnInit } from '@angular/core';
import { MovimientoService } from '../../services/movimiento.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  capacidad: string = 'Cargando...';

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.cargarCapacidad();
  }

  cargarCapacidad(): void {
    this.movimientoService.verCapacidad().subscribe({
      next: (data) => {
        this.capacidad = data;
      },
      error: (err) => {
        console.error('Error al obtener capacidad', err);
        this.capacidad = 'Error al cargar capacidad';
      }
    });
  }
}
