import { NotificacionesGeneralesComponent } from './Components/NotificacionesGenerales/notificaciones-generales/notificaciones-generales.component';
import { NotificacioneComponent } from './Components/Notificacione/notificacione/notificacione.component';

import { StarRatingPage } from './Components/star-rating/star-rating/star-rating.page';
import { CursoDisponiblesPage } from './pages/Cursos/CursoDisponible/curso-disponibles/curso-disponibles.page';

import { PerfilPage } from './pages/perfil/perfil.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarScrollZoomout } from './Components/avatarscrollzoomout/avatarscrollzoomout';
import { ProgressBarModule } from 'angular-progress-bar';
import { FormularioQuizPageModule } from './Components/FormularioQuiz/formulario-quiz/formulario-quiz.module';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormularioQuizDiagnosticoPageModule } from './Components/FormularioQuizDiagnostico/formulario-quiz-diagnostico/formulario-quiz-diagnostico.module';

@NgModule({
  declarations: [AppComponent,NotificationsComponent,NotificacioneComponent,NotificacionesGeneralesComponent],
  entryComponents: [NotificationsComponent],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(),  FormsModule,AppRoutingModule,ReactiveFormsModule,  ProgressBarModule ],
  providers: [PerfilPage,CursoDisponiblesPage,StarRatingPage,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
