import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';
import { Curso } from '../models/curso';
import { Alumno } from '../models/alumno';
import { Nota } from '../models/nota';
import { AlumnoService } from '../services/alumno.service';
import { CursoService } from '../services/curso.service';
import { NotaService } from '../services/nota.service';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [TableModule, ButtonModule,DialogModule,RouterModule,InputTextModule,
    FormsModule,ConfirmDialogModule,ToastModule, DropdownModule],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent {
  cursos:Curso[]=[];
  alumnos:Alumno[]=[];
  notas:Nota[]=[];
  visible:boolean=false;
  isDeleteInProgress:boolean=false;
  nota=new Nota();
  titulo:string='';
  opc:string='';
  op = 0; 
  selectedMarca: Alumno | undefined;
  selectedTipo: Curso | undefined;
  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private notaService:NotaService,
    private messageService: MessageService
  ){}
  ngOnInit(){
    this.listarNotas();
    this.listarAlumnos();
    this.listasCursos();
  }
  listasCursos(){
    this.cursoService.getCursos().subscribe((data)=>{
      this.cursos=data;
      console.log(this.cursos)
    });
  }
  listarAlumnos(){
    this.alumnoService.getAlumnos().subscribe((data)=>{
      this.alumnos=data;
      console.log(this.alumnos)
    });
  }
  listarNotas(){
    this.notaService.getNotas().subscribe((data)=>{
      this.notas=data;
    });
  }
  showDialogCreate(){
    this.titulo="Crear Nota"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number){
    this.titulo="Editar Nota"
    this.opc="Editar"; 
   this.notaService.getNotaById(id).subscribe((data)=>{
      this.nota=data; 
      this.op=1;     
   });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteNota(id:number){
    this.isDeleteInProgress = true;
    this.notaService.deleteNota(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Nota eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarNotas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la nota',
        });
      },
    });
  }
  opcion(){
    if(this.op==0){
      this.addNota();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editNota();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
  }
  addNota(){
    this.notaService.crearNota(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Registrado',
        });
        this.listarNotas();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear el Coche',
        });
      },
    });    
    this.visible = false;
  }
  editNota(){
    this.notaService.updateNota(this.nota,this.nota.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Editado',
        });
        this.listarNotas();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar el Coche',
        });
      },
    });    
    this.visible = false;
  }
  limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.nota.id=0;
    this.nota.alumno;
    this.nota.curso;
    this.nota.nota1=0;
    this.nota.nota2=0;
    this.nota.nota3 = 0;
  }
}
