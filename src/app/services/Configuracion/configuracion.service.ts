
import { Injectable } from '@angular/core';
import { MenuPageModule } from 'src/app/pages/menu/menu.module';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InicioSesion } from 'src/app/models/InicioSesion/inicio-sesion';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/InicioSesion/usuario';
import { PreguntaQuiz, PreguntaQuizPrincipal } from 'src/app/models/Pregunta/pregunta-quiz';
import { ContenidoCurso } from 'src/app/models/ContenidoCurso/contenido-curso';
import { Genero } from 'src/app/models/Genero/genero';
import { Persona } from 'src/app/models/Persona/persona';
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  Certificado:Boolean;
  Diagnostico:Boolean;
  //Mensajes
  Titulo:any;
  Informacion:any;
  //Mensajes Botones
  ActivarBoton:boolean;
  ActivarBotonDiagnostico:boolean;
  TextoBoton:any;
  //CursosDisponibles
  public id_Curso:number;
  public data:any;
public allQuestions:PreguntaQuizPrincipal[];

  //
  public Num=0;
  public TiemposTrascurridos = [];
 //Termino Quiz
  public Quiz_TotalPreguntas: number;
  public Quiz_NumeroPreguntasCorrectas: number;
  public Quiz_TiempoUsado: number;
  public Quiz_TodasPreguntas: PreguntaQuizPrincipal[]; 
  public Quiz_TodasPreguntasDiagnostico: PreguntaQuizPrincipal[]; 

  path_base="http://localhost/ProyectoIsabel";
  Configuracion:any;
  public IntroFinalizado:any;
  public Tabs:any;
  private IdCurso:number;
  private IdCategoria:number;

  private id_usuario:number;

  public NumeroPreguntasCorrectas=0;
  IndexPregunta:number;
  constructor(private http:HttpClient,) {}
  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json',
    })

  /* Metodos Get y set*/
  }
  //Recuperar Cursos Finalizados

  //Borrar Progreso
  getBorrarProgresoCurso(item){
    let strUrl=this.path_base + "/Configuracion/BorrarProgresoCurso.php";
    return this.http.post<any>(strUrl,JSON.stringify(item))
    
  }
  //Verificar Quiz
  getVerificarQuiz(id){
    let strUrl=this.path_base + "/Configuracion/VerificarQuiz.php"+`?id=${id}`;
    return this.http.get<any>(strUrl)
  }
  //Guardar Nota
  getGuardarNota(item){
    let strUrl=this.path_base + "/Configuracion/GuardarNota.php";
    return this.http.post<any>(strUrl,JSON.stringify(item))
    
  }
  getGuardarNotaD(item){
    let strUrl=this.path_base + "/Configuracion/GuardarNotaD.php";
    return this.http.post<any>(strUrl,JSON.stringify(item))
    
  }
  //Guardar Respuesta de la Nota
  getGuardarNotaRespuesta(item){
    let strUrl=this.path_base + "/Configuracion/GuardarNotaRespuesta.php";
    return this.http.post<any>(strUrl,JSON.stringify(item))
    
  }
  //Recuperar Categorias
  GetRecuperarCategoria(){
    let strUrl=this.path_base+"/Configuracion/RecuperarCategorias.php";
    return this.http.get<any>(strUrl);
  }
  //Crear Cuenta
  crearCuenta(item){
   
    let strUrl=this.path_base+"/Configuracion/InsertarUsuario.php";
    return this.http.post<any>(strUrl,JSON.stringify(item))
  }

  //Perfil
  getProgresoCursoGraficas(id){
    let strUrl=this.path_base + "/Configuracion/RecuperarProgresoCursoGraficas.php"+`?id=${id}`;
    return this.http.get<any>(strUrl)
    
  }
  getPreguntasCursoGraficas(){
    let strUrl=this.path_base + "/Configuracion/RecuperarPreguntasCursoGraficas.php";
    return this.http.get<any>(strUrl)
    
  }
  getRecuperarCursosInscritos(id){
    let strUrl=this.path_base + "/Configuracion/RecuperarCursosInscrito.php"+`?id=${id}`;
    return this.http.get<any>(strUrl)
  }

  getRecuperarCursosFinalizados(id){
    let strUrl=this.path_base + "/Configuracion/RecuperarCursosFinalizados.php"+`?id=${id}`;
    return this.http.get<any>(strUrl)
  }

//Tutoriales Videos
getGrabarTutorialesVideos(item){
   
    
  let strUrl=this.path_base + "/Configuracion/IngresarProgresoCurso.php";
  return this.http.post<any>(strUrl,JSON.stringify(item))
}
getRecuperarProgresoCurso(item){
  let strUrl=this.path_base + "/Configuracion/RecuperarProgresoCurso.php";
  return this.http.post<any>(strUrl,JSON.stringify(item))
  
}
//Persona

RecuperarGenero(){
  let strUrl=this.path_base+"/Configuracion/Genero.php";
  return this.http.get<any>(strUrl);
}
RecuperarProvincia(){
  let strUrl=this.path_base+"/Configuracion/Provincia.php";
  return this.http.get<any>(strUrl);
}

RecuperarDatosPersona(item):Observable<Persona>{
  let strUrl=this.path_base+"/Configuracion/RecuperarPersona.php";
  return this.http.post<Persona>(strUrl,JSON.stringify(item))
}
ActualizarPersona(item){
    
  let strUrl=this.path_base+"/Configuracion/ActualizarDatosPersona.php";
  return this.http.post<Persona>(strUrl,JSON.stringify(item))
}

//Cursos Favoritos
getListaCursosFavoritos(item){
   
    
  let strUrl=this.path_base + "/Configuracion/ListaCursosFavoritos.php";
  return this.http.post<any>(strUrl,JSON.stringify(item))
  
}
getQuitarCursoFavoritos(id){
  let strUrl=this.path_base + "/Configuracion/QuitarCursoFavoritos.php"+`?id=${id}`;
  return this.http.get<any>(strUrl)
  
}
//Informacion Curso

getIngresarPersonaCurso(item){
   
    
  let strUrl=this.path_base + "/Configuracion/IngresarPersonaCurso.php";
  return this.http.post<any>(strUrl,JSON.stringify(item))
}
getVerificarDatos(id){
  let strUrl=this.path_base + "/Configuracion/VerificarDatosCompletos.php"+`?id=${id}`;
  return this.http.get<any>(strUrl)
  
}
getContenidoCurso(id){
  let strUrl=this.path_base + "/Configuracion/RecuperarContenidoCurso.php"+`?id=${id}`;
  return this.http.get<any>(strUrl)
  
}
getPreguntaQuiz(id){
  let strUrl=this.path_base + "/Configuracion/RecuperarQuizCurso.php"+`?id=${id}`;
  return this.http.get<any>(strUrl)
  
}
getPreguntaQuizDiagnostico(){
  let strUrl=this.path_base + "/Configuracion/RecuperarQuizDiagnostico.php";
  return this.http.get<any>(strUrl)
  
}




public SetNumerosPreguntasCorrectas(){
  return this.NumeroPreguntasCorrectas;
}
  public setIdCurso(id:number){
    this.IdCurso=id;
   
  }
  public getIdCurso(){
    return this.IdCurso;
  }
  public setIdCategoria(id:number){
    this.IdCategoria=id;
   
  }
  public getIdCategoria(){
    return this.IdCategoria;
  }

  getCursosFavorito(item){
   
    console.log(item);
    let strUrl=this.path_base + "/Configuracion/CursosFavoritos.php";
    return this.http.post<any>(strUrl,JSON.stringify(item))
    
  }
  getCursosDisponibles(item){
   
    console.log(item);
    let strUrl=this.path_base + "/Configuracion/RecuperarCursos.php";
    return this.http.post<any>(strUrl,JSON.stringify(item))
  }
  Ingresar(item):Observable<InicioSesion>{
    let strUrl=this.path_base+"/Configuracion/Ingresar.php";
    return this.http.post<InicioSesion>(strUrl,JSON.stringify(item))
  }
  RecuperarId(item):Observable<InicioSesion>{
    let strUrl=this.path_base+"/Configuracion/Persona_Id.php";
    return this.http.post<InicioSesion>(strUrl,JSON.stringify(item))
  }
  getRecuperarPersonaId(id){
    let strUrl=this.path_base + "/Configuracion/RecuperarPersona_Id.php"+`?id=${id}`;
    return this.http.get<any>(strUrl)
    
  }
  getPersonaID() {
    
  	return JSON.parse(localStorage.getItem('PersonaId'));
  }
  setPersonaID(id) {
    localStorage.setItem('PersonaId', JSON.stringify(id));
  }
  generarPdf(item){
    let strUrl=this.path_base + "/Reportes/Reporte.php";
   
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
   
    return this.http.post(strUrl, JSON.stringify(item), {headers: headers});
  }
  getUserLoggedIn() {
    
  	return JSON.parse(localStorage.getItem('currentUser'));
  }
  setUserLoggedIn(user:Usuario) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  SetFinalizoIntro(Intro:any) {
    this.IntroFinalizado=Intro;
    localStorage.setItem('Intro', JSON.stringify(this.IntroFinalizado));
  }
  GetFinalizoIntro() {
    
  	return JSON.parse(localStorage.getItem('Intro'));
  }
  
  SetActivarTab(dato:any) {
    this.Tabs=dato;
    localStorage.setItem('Tabs', JSON.stringify(this.Tabs));
  }
  GetActivarTab() {
    
  	return JSON.parse(localStorage.getItem('Tabs'));
  }



 
}
