import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/InicioSesion/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'creacioncuenta',
    loadChildren: () => import('./pages/RegistroInicioSesion/creacioncuenta/creacioncuenta.module').then( m => m.CreacioncuentaPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/Tabs/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'curso-disponibles',
    loadChildren: () => import('./pages/Cursos/CursoDisponible/curso-disponibles/curso-disponibles.module').then( m => m.CursoDisponiblesPageModule)
  },
  {
    path: 'informacion-curso',
    loadChildren: () => import('./pages/Cursos/InformacionCurso/informacion-curso/informacion-curso.module').then( m => m.InformacionCursoPageModule)
  },
  {
    path: 'star-rating',
    loadChildren: () => import('./Components/star-rating/star-rating/star-rating.module').then( m => m.StarRatingPageModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('./Components/Instructor/instructor/instructor.module').then( m => m.InstructorPageModule)
  },
 
  {
    path: 'tutoriales-videos',
    loadChildren: () => import('./pages/ContenidoVideo/tutoriales-videos/tutoriales-videos.module').then( m => m.TutorialesVideosPageModule)
  },
  {
    path: 'cargar-imagen',
    loadChildren: () => import('./Components/CargarImagen/cargar-imagen/cargar-imagen.module').then( m => m.CargarImagenPageModule)
  },

  {
    path: 'preguntas-quiz',
    loadChildren: () => import('./pages/Quiz/PreguntasQuiz/preguntas-quiz/preguntas-quiz.module').then( m => m.PreguntasQuizPageModule)
  },
  {
    path: 'preguntas-quiz/:questionId',
    loadChildren: () => import('./pages/Quiz/PreguntasQuiz/preguntas-quiz/preguntas-quiz.module').then( m => m.PreguntasQuizPageModule)
  },
  
  {
    path: 'formulario-quiz',
    loadChildren: () => import('./Components/FormularioQuiz/formulario-quiz/formulario-quiz.module').then( m => m.FormularioQuizPageModule)
  },
  {
    path: 'certificado-quiz',
    loadChildren: () => import('./pages/Quiz/CertificadoQuiz/certificado-quiz/certificado-quiz.module').then( m => m.CertificadoQuizPageModule)
  },
  {
    path: 'curso-favoritos',
    loadChildren: () => import('./pages/Cursos/CursoFavoritos/curso-favoritos/curso-favoritos.module').then( m => m.CursoFavoritosPageModule)
  },
  {
    path: 'categoria-cursos',
    loadChildren: () => import('./pages/Cursos/CategoriaCursos/categoria-cursos/categoria-cursos.module').then( m => m.CategoriaCursosPageModule)
  },
  
  {
    path: 'preguntas-quiz-diagnostico',
    loadChildren: () => import('./pages/Quiz/PreguntasQuizDiagnostico/preguntas-quiz-diagnostico/preguntas-quiz-diagnostico.module').then( m => m.PreguntasQuizDiagnosticoPageModule)
  },
  {
    path: 'preguntas-quiz-diagnostico/:PreguntaId',
    loadChildren: () => import('./pages/Quiz/PreguntasQuizDiagnostico/preguntas-quiz-diagnostico/preguntas-quiz-diagnostico.module').then( m => m.PreguntasQuizDiagnosticoPageModule)
  },
  {
    path: 'formulario-quiz-diagnostico',
    loadChildren: () => import('./Components/FormularioQuizDiagnostico/formulario-quiz-diagnostico/formulario-quiz-diagnostico.module').then( m => m.FormularioQuizDiagnosticoPageModule)
  },
  {
    path: 'resultado-quiz',
    loadChildren: () => import('./pages/Quiz/ResultadoQuiz/resultado-quiz/resultado-quiz.module').then( m => m.ResultadoQuizPageModule)
  },
 
  
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
