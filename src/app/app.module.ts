// Base imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Material Design Elements
import { MaterialElementsModule } from './material-elements.module';
// Charting
import { ChartsModule } from 'ng2-charts';
// Components
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth-guard/auth-guard.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './ui/nav/nav.component';
import { LoginComponent } from './login/login.component';
import { WeatherItemComponent } from './weather/weather-item/weather-item.component';
import { WeatherDetailComponent } from './weather/weather-detail/weather-detail.component';
import { WeatherGraphComponent } from './weather/weather-graph/weather-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    NavComponent,
    LoginComponent,
    WeatherItemComponent,
    WeatherDetailComponent,
    WeatherGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthGuard,
    BrowserAnimationsModule,
    MaterialElementsModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
