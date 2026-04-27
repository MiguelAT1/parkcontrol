import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoService } from '../../services/auto.service';
import { UsuarioService } from '../../services/usuario.service';
import { Auto } from '../../models/auto.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-autos',
  imports: [CommonModule, FormsModule],
  templateUrl: './autos.html',
  styleUrl: './autos.css'
})
export class Autos implements OnInit {
  autos: Auto[] = [];
  usuarios: Usuario[] = [];
  autoActual: Auto = { placa: '', marca: '', modelo: '', color: '', activo: true };
  usuarioSeleccionadoId: number = 0;
  editando: boolean = false;

  constructor(
    private autoService: AutoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarAutos();
    this.cargarUsuarios();
  }

  cargarAutos(): void {
    this.autoService.listarAutos().subscribe({
      next: (data) => this.autos = data,
      error: (err) => console.error('Error al cargar autos', err)
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  guardar(): void {
    if (this.editando && this.autoActual.id) {
      this.autoService.actualizarAuto(this.autoActual.id, this.autoActual).subscribe({
        next: () => {
          this.cargarAutos();
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      if (this.usuarioSeleccionadoId === 0) {
        alert('Debe seleccionar un usuario.');
        return;
      }
      this.autoService.guardarAuto(this.autoActual, this.usuarioSeleccionadoId).subscribe({
        next: () => {
          this.cargarAutos();
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al guardar', err)
      });
    }
  }

  editar(auto: Auto): void {
    this.autoActual = { ...auto };
    this.editando = true;
    // La edición del endpoint backend actualiza el auto, asumo que no cambia el usuario
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Está seguro de eliminar este auto?')) {
      this.autoService.eliminarAuto(id).subscribe({
        next: () => this.cargarAutos(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.autoActual = { placa: '', marca: '', modelo: '', color: '', activo: true };
    this.usuarioSeleccionadoId = 0;
    this.editando = false;
  }
}
