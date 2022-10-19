import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-principal-alumno',
  templateUrl: './principal-alumno.page.html',
  styleUrls: ['./principal-alumno.page.scss'],
})
export class PrincipalAlumnoPage implements OnInit {

  private usuario: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.username
  }

  cerrarSesion() {
    this.router.navigate(["/home"])
  }

  justificativo() {
    this.router.navigate(["/justificativo"])
  }

  asistencias() {
    this.router.navigate(["/asistencias"])
  }

}
