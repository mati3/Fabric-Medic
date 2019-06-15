import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';


@Injectable({
  providedIn: 'root'
})
export class MedicService {

  uri = 'http://localhost:8081/api';
  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, notifierService: NotifierService) {
      this.notifier = notifierService;
  }

  getAllMedics() {
    return this.http.get(`${this.uri}/medics`);
  }

  addMedic(nombre, principioActivo, formato, propietario) {
    const medic = {
      nombre : nombre,
      principioActivo : principioActivo,
      formato : formato,
      propietario : propietario
    };
    console.log(medic);
    this.http.post(`${this.uri}/medic`, medic)
        .subscribe(res => {
          console.log('Done');
          this.notifier.notify( 'success', 'Transaction id: '+res['trans_id'] );
        });
  }
}
