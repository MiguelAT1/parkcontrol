import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Usuarios } from './components/usuarios/usuarios';
import { Autos } from './components/autos/autos';
import { RegistroMovimiento } from './components/registro-movimiento/registro-movimiento';
import { Historial } from './components/historial/historial';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'usuarios', component: Usuarios },
  { path: 'autos', component: Autos },
  { path: 'registro-movimiento', component: RegistroMovimiento },
  { path: 'historial', component: Historial }
];
