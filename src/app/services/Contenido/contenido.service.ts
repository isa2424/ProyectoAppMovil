import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfiguracionService } from '../Configuracion/configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  path_base="http://localhost/ProyectoIsabel";
  constructor(
    private configuracion:ConfiguracionService,
    private http:HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json',
    })
  }

  GetRecuperarCategoria(){
    let strUrl=this.path_base+"/Configuracion/RecuperarCategorias.php";
    return this.http.get<any>(strUrl);
  }
}
