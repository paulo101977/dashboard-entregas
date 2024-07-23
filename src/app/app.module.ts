import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { FullLoadingComponent } from './components/full-loading/full-loading.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaEntregasComponent } from './pages/lista-entregas/lista-entregas.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLoadingComponent,
    DashboardComponent,
    ListaEntregasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
