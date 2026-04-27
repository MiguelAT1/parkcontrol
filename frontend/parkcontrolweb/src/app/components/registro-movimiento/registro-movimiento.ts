import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovimientoService } from '../../services/movimiento.service';
import { AutoService } from '../../services/auto.service';
import { Auto } from '../../models/auto.model';

@Component({
  selector: 'app-registro-movimiento',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-movimiento.html',
  styleUrl: './registro-movimiento.css'
})
export class RegistroMovimiento implements OnInit {
  autos: Auto[] = [];
  autoSeleccionadoId: number = 0;
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' | '' = '';

  constructor(
    private movimientoService: MovimientoService,
    private autoService: AutoService
  ) {}

  ngOnInit(): void {
    this.cargarAutos();
  }

  cargarAutos(): void {
    this.autoService.listarAutos().subscribe({
      next: (data) => {
        // Mostramos solo los autos activos
        this.autos = data.filter(a => a.activo);
      },
      error: (err) => console.error('Error al cargar autos', err)
    });
  }

  registrarEntrada(): void {
    if (this.autoSeleccionadoId === 0) {
      this.mostrarMensaje('Debe seleccionar un auto', 'danger');
      return;
    }
    
    this.movimientoService.registrarEntrada(this.autoSeleccionadoId).subscribe({
      next: (res) => {
        this.mostrarMensaje(res, 'success');
        this.autoSeleccionadoId = 0;
      },
      error: (err) => {
        console.error('Error', err);
        this.mostrarMensaje('Error al registrar la entrada', 'danger');
      }
    });
  }

  registrarSalida(): void {
    if (this.autoSeleccionadoId === 0) {
      this.mostrarMensaje('Debe seleccionar un auto', 'danger');
      return;
    }
    
    this.movimientoService.registrarSalida(this.autoSeleccionadoId).subscribe({
      next: (res) => {
        this.mostrarMensaje(res, 'success');
        this.autoSeleccionadoId = 0;
      },
      error: (err) => {
        console.error('Error', err);
        this.mostrarMensaje('Error al registrar la salida', 'danger');
      }
    });
  }

  mostrarMensaje(msg: string, tipo: 'success' | 'danger'): void {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
    }, 5000);
  }
}
