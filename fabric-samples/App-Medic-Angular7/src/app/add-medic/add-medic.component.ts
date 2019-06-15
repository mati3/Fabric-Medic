import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MedicService } from 'src/app/services/medic.service';

@Component({ templateUrl: 'add-medic.component.html' })

export class AddMedicComponent implements OnInit {
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ls: MedicService) {
      this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', Validators.required ],
      principioActivo: ['', Validators.required ],
      formato: ['', Validators.required ],
      propietario: ['', Validators.required ]
    });
  }

  addMedic(nombre, principioActivo, formato, propietario) {
    this.ls.addMedic(nombre, principioActivo, formato, propietario);
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
