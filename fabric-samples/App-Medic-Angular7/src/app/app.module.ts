import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { BackendProvider } from './backend';

import { AppComponent }  from './app.component';
import { routing }        from './app-routing.module';

import { AlertSystem } from 'src/app/alertsystem/alert.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { GetAllMedicComponent } from './get-all-medic/get-all-medic.component';
import { AddMedicComponent } from 'src/app/add-medic/add-medic.component';
import { MedicService } from './services/medic.service';

import { NotifierModule } from 'angular-notifier';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        NotifierModule
    ],
    declarations: [
        AppComponent,
        AlertSystem,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        GetAllMedicComponent,
        AddMedicComponent
    ],
    providers: [
        // provider used to create fake backend
        BackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
