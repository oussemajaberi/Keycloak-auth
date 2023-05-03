import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NavbarComponent } from './includes/navbar/navbar.component';
export function Kcfactory(kcService: KeycloakService) {
  return () =>
   kcService.init({

      config: {
        url: 'http://localhost:8180/auth/',
        realm: 'Auth-user',
        clientId:'client-ang',


      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe:true

      },
    });
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {provide : APP_INITIALIZER, deps : [KeycloakService],useFactory : Kcfactory, multi : true},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
