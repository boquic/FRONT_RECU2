import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl = 'http://localhost:8080/api/notas';  // URL de la API actualizada a "notas"
  
  constructor(private http: HttpClient) { }

  // Obtener lista de notas
  getNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl);
  }

  // Obtener nota por ID
  getNotaById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva nota
  crearNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nota);
  }
  
  // Eliminar una nota
  deleteNota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una nota
  updateNota(nota: Nota, id: number): Observable<Nota> {
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, nota);
  }
}
