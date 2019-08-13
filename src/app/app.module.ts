import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';


// EXTRAS
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { uiRouter } from './app.routes';
import { AuthGuard } from './auth.guard';

export function tokenGetter() {
  // console.log(localStorage.getItem('access_token'));
  return localStorage.getItem('access_token');
}

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AsyncComponent } from './async/async.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AsyncComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    uiRouter,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/login']
      }
    })
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService,
    AuthGuard,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
