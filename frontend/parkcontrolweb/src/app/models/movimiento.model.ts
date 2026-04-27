import { Auto } from './auto.model';

export interface Movimiento {
  id?: number;
  tipoMovimiento: string;
  fechaHora: string;
  auto?: Auto;
}
