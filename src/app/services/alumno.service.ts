import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl='http://localhost:8080/api/alumnos';
  constructor(private http:HttpClient) { }

  getAlumnos():Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.apiUrl);
  }
  
}
