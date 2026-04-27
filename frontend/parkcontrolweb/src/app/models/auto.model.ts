import { Usuario } from './usuario.model';

export interface Auto {
  id?: number;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  activo: boolean;
  usuario?: Usuario;
}
