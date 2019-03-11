// Base imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Material Design Elements
import { MaterialElementsModule } from './material-elements.module';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth-guard/auth-guard.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './ui/nav/nav.component';
import { LoginComponent } from './login/login.component';
import { WeatherItemComponent } from './weather/weather-item/weather-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    NavComponent,
    LoginComponent,
    WeatherItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthGuard,
    BrowserAnimationsModule,
    MaterialElementsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
