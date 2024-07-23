import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaEntregasComponent } from './pages/lista-entregas/lista-entregas.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { titulo: 'Dashboard' },
  },
  {
    path: 'lista-entregas',
    component: ListaEntregasComponent,
    data: { titulo: 'Lista de entregas' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
