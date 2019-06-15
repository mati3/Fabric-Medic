import { Component, OnInit } from '@angular/core';
import Medic from '../medic';
import { MedicService } from 'src/app/services/medic.service';


@Component({ templateUrl: 'get-all-medic.component.html' })

export class GetAllMedicComponent implements OnInit {

  medics: Medic[];

    constructor(private bs: MedicService) { }

  ngOnInit() {
    this.bs.getAllMedics().subscribe((data: Medic[]) => {
        this.medics = [];
        data.forEach(x => this.medics.push(new Medic(x['Key'], x['Record']['Nombre'],
          x['Record']['PrincipioActivo'], x['Record']['Formato'], x['Record']['Propietario'])))
        console.log(this.medics);
    });
  }
}
