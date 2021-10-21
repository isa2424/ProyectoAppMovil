import { ConfiguracionService } from './../../services/Configuracion/configuracion.service';
import { Opcion, Option } from './opcion';
export interface PreguntaQuiz {
  PreguntaID : number;
  PreguntaText: string;
  options: Option[];
  answer: string;
  explanation: string;
  SeleccionOpcion: string;
  selectedOption: string;
}


export class PreguntaQuizPrincipal {
  Id_PreguntaQuiz : number;
  Id_TipoPregunta : number;
  Pregunta: string;
  Opciones: Opcion[];
  RespuestaCorrecta: string;
  Explicacion: string;
  SeleccionRespuestaPrincipal: string;
  SeleccionRespuestaSecundario: string;
  toggle:boolean;
  EsCorrecto:boolean;
  Id_NotaCurso:number;
}




