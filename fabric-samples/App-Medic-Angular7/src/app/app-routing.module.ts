import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';

import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { Guard } from './guard';
import { GetAllMedicComponent } from 'src/app/get-all-medic/get-all-medic.component';
import { AddMedicComponent } from 'src/app/add-medic/add-medic.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [Guard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'medics/add', component: AddMedicComponent},
    { path: 'medics', component: GetAllMedicComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

