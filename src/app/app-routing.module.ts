import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { DetaljiEksComponent } from './detalji-eks/detalji-eks.component';
import { EksponatiComponent } from './eksponati/eksponati.component';

import { HomeComponent } from './home';
import { SvePostavkeComponent } from './sve-postavke/sve-postavke.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const usModule = () => import('./us/us.module').then(x => x.UsModule);


const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path : 'eksponati', component: EksponatiComponent },
    { path : 'detaljiEks', component: DetaljiEksComponent },



    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'sve-postavke/:id',component: SvePostavkeComponent },
    { path: 'obilasci', loadChildren: usModule, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }