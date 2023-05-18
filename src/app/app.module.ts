import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { SvePostavkeComponent } from './sve-postavke/sve-postavke.component';
import { MaterialModule } from './material.module';;
import { BirajObilazakComponent } from './biraj-obilazak/biraj-obilazak.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';;
import { DetaljiObilaskaComponent } from './detalji-obilaska/detalji-obilaska.component'
;
import { EksponatiComponent } from './eksponati/eksponati.component'
;
import { KomentarComponent } from './komentar/komentar.component'
;
import { DetaljiEksComponent } from './detalji-eks/detalji-eks.component'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        SvePostavkeComponent,
        BirajObilazakComponent ,
        DetaljiObilaskaComponent ,
        EksponatiComponent ,
        KomentarComponent ,
        DetaljiEksComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    entryComponents: [BirajObilazakComponent]
,
    bootstrap: [AppComponent],

    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { };