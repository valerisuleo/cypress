// MODULES
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AsyncComponent } from './async/async.component';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent},
	// { path: 'home', component: AsyncComponent},
	{ path: 'home', component: AsyncComponent, canActivate: [AuthGuard]},
	{ path: '**', redirectTo: 'home' }
];

export const uiRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);
