import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
	{ path: 'home', component: LoginComponent},
	{ path: '**', redirectTo: 'home' }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
