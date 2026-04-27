import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];
  usuarioActual: Usuario = { nombres: '', apellidos: '', telefono: '', visitas: 0, promocion: '' };
  editando: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  guardar(): void {
    if (this.editando && this.usuarioActual.id) {
      this.usuarioService.actualizarUsuario(this.usuarioActual.id, this.usuarioActual).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.usuarioService.guardarUsuario(this.usuarioActual).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al guardar', err)
      });
    }
  }

  editar(usuario: Usuario): void {
    this.usuarioActual = { ...usuario };
    this.editando = true;
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.usuarioActual = { nombres: '', apellidos: '', telefono: '', visitas: 0, promocion: '' };
    this.editando = false;
  }
}
