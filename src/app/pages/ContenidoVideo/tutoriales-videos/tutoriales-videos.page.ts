import { ContenidoCurso } from './../../../models/ContenidoCurso/contenido-curso';

import { ConfiguracionService } from './../../../services/Configuracion/configuracion.service';

import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IonContent, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { VideoPlaylistModel } from './video-playlist.model';
import { VgAPI } from 'videogular2/compiled/core';

import { NotificationsComponent } from 'src/app/Components/notifications/notifications.component';
import { Contenido } from 'src/app/models/Contenido/contenido';


@Component({
  selector: 'app-tutoriales-videos',
  templateUrl: './tutoriales-videos.page.html',
  styleUrls: ['./tutoriales-videos.page.scss'],
})
export class TutorialesVideosPage implements OnInit {
	@ViewChild(IonContent, { static: false }) content: IonContent;
	Bandera:boolean;
	Bandera1=true;
	Oportunidad:number;
	variables:Contenido;
	variables2:Contenido;
	ActivarQuiz:boolean;
	data:any;
	dataProgreso:any;
	ContadorVideo:number;
	i=0;
 	data2:any;
  	Seleccionar_Video: any;
	prueba:string;
  	loading: any;
	start_playing: boolean = false;
  	api: VgAPI;
  	video_playlist_model: VideoPlaylistModel = new VideoPlaylistModel();

  constructor(
    public navCtrl: NavController,
	public loadingCtrl: LoadingController,
	public popoverCtrl: PopoverController,
	public configuracion:ConfiguracionService
   
  ) {
	this.variables2=new Contenido() ;
	this.variables=new Contenido() ;
	  this.data=[];
	  this.dataProgreso=[];
	  this.data2=[];
	 this.Seleccionar_Video=[];
	 
  }
  ionViewWillEnter() {
	  let IdPersona=this.configuracion.getPersonaID();
	 
	if(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona)==null || localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona)=="null"){
		
		this.Oportunidad=2;
	}else{
		
		this.Oportunidad=2-parseInt(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona));
	}
	
	localStorage.setItem('Tabs', null);
	this.RecuperarContenidoVideo();
	
  }

  ngOnInit(){

	
 
  }

  
  RecuperarContenidoVideo(){
    this.configuracion.getContenidoCurso(this.configuracion.id_Curso).subscribe(respuesta=>{
		this.ContadorVideo=respuesta.ContenidoCurso.length;
		console.log(respuesta)
		this.data=respuesta;	 
		var user1 =this.configuracion.getPersonaID();
		this.variables2.variable1=user1;
    	this.variables2.variable2=this.configuracion.id_Curso;
		this.configuracion.getRecuperarProgresoCurso(this.variables2).subscribe(respuesta=>{
			if(respuesta!=null){
				this.dataProgreso=respuesta;
				let i=0;
				let j=0;
				
				for (const data in this.data.ContenidoCurso ) {
					for (const key in this.dataProgreso) {
						
						
						if(this.data.ContenidoCurso[i].Id_ContenidoCurso==this.dataProgreso[j].Id_ContenidoCurso){
							this.data.ContenidoCurso[i].Disponible=1;
							
							if(this.data.ContenidoCurso[i].Contador<(this.ContadorVideo-1)){
								
								this.ActivarQuiz=false;
							}else{
								this.ActivarQuiz=true;
								
							}
						}
						j=j+1;	
					}
					j=0;
					i=i+1;
				}
			}
			
			
		});  

	  	this.Seleccionar_Video[0] = this.data.ContenidoCurso[0];
	  	this.Seleccionar_Video[0].Disponible=1;

    	this.variables.variable1=this.data.Id_Curso;
    	this.variables.variable2=this.Seleccionar_Video[0].Id_ContenidoCurso;
		var user1 =this.configuracion.getPersonaID();
		this.variables.variable3=user1;
     if(this.Bandera1=true){
		this.configuracion.getGrabarTutorialesVideos(this.variables).subscribe(respuesta=>{
      
     
      
		});
		this.Bandera1=false;
	 }
    
	

      
	});

	
	
  }
 
	async createLoader(){
		this.loading =  await this.loadingCtrl.create({
			duration: 2000
		  });
		  this.loading.present();
	}

	presentLoader(){
		// Check if the current instance is usable
		if (this.loading === undefined || (this.loading !== undefined && this.loading.instance === null)){
			// If it's not usable, then create a new one
			this.createLoader();
		}

		
	}

	dismissLoader(){
		// Check if the current instance is usable
		if (this.loading !== undefined){
			// If it's not usable, then create a new one
			this.loading.dismiss();
		}
	}

	playMedia(media) {
		if(media.Disponible==0){

			this.notifications();
			this.ScrollToTop();
		}else{
			if(media !== this.Seleccionar_Video[0])
			{
				//this.presentLoader();
				  // Change sources
				  this.Seleccionar_Video[0] = media;
				  this.ScrollToTop();
				  // When changing sources we wait until the metadata is loaded and then we start playing the video
			}
		}
		

    // Check if this media is not the same we are currently playing
   
	}
	
	async notifications() {
		const popover = await this.popoverCtrl.create({
		  component: NotificationsComponent,
		  
		  animated: true,
		  showBackdrop: true
		});
		return await popover.present();
	  }
	onPlayerReady(api: VgAPI) {
	this.api = api;
	
		this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
		
		this.api.subscriptions.timeUpdate.subscribe(data => {

			let currentTime = data.srcElement.currentTime;
			if(currentTime==this.api.duration){
				
				if(this.Seleccionar_Video[0].Contador< (this.ContadorVideo-1)){
				
					
					this.data.ContenidoCurso[this.Seleccionar_Video[0].Contador+1].Disponible=1;

				}
				
			}
			
		  });





		  
	}

  	playVideo() {
		if(this.start_playing)
		{
			this.dismissLoader();
			this.api.play();
			this.Bandera=true;
			if(this.Seleccionar_Video[0].Contador<(this.ContadorVideo-1)){
				if(this.data.ContenidoCurso[this.Seleccionar_Video[0].Contador+1].Disponible==0){
					this.api.subscriptions.timeUpdate.subscribe(data => {
						let currentTime = data.srcElement.currentTime;
						if(currentTime==this.api.duration){
							if(this.Seleccionar_Video[0].Contador< (this.ContadorVideo-1)){
								if(this.Bandera==true){
									this.variables.variable2=this.Seleccionar_Video[0].Id_ContenidoCurso;
								
								 
									this.configuracion.getGrabarTutorialesVideos(this.variables).subscribe(respuesta=>{
								  
								 
								  
									});
								
									this.data.ContenidoCurso[this.Seleccionar_Video[0].Contador+1].Disponible=1;
									this.Bandera=false;
								}
								
							}
							
						}
						
						
					  });
				}
			}else{
				this.Bandera=true;
				this.api.subscriptions.timeUpdate.subscribe(data => {
					let currentTime = data.srcElement.currentTime;
					if(currentTime==this.api.duration){
						if(this.Bandera==true){
							this.variables.variable2=this.Seleccionar_Video[0].Id_ContenidoCurso;
								
							
								 
								this.configuracion.getGrabarTutorialesVideos(this.variables).subscribe(respuesta=>{
								  
								 
								  
								});
						this.ActivarQuiz=true;
						}
						
					}
					
					
				  });
				
			}
			
			
			
		}
		else
		{
			this.start_playing = true;
		}
	}
	ScrollToTop() {
		this.content.scrollToTop(1500);
	  }
	  
	IniciarQuiz(){
		if(this.ActivarQuiz){
			this.api.pause();
			this.configuracion.getPreguntaQuiz(this.configuracion.id_Curso).subscribe(respuesta=>{
				console.log(respuesta)
				this.data2=respuesta;
			
				this.configuracion.allQuestions=this.data2;
				this.configuracion.Diagnostico=false;
				this.configuracion.Certificado=true;
				this.navCtrl.navigateRoot('/preguntas-quiz/1');
			});
		}
		
		
	}
	Menu(){
		this.variables.variable1=null;
    	this.variables.variable2=null;
		this.variables.variable3=null;
		this.api.pause();
		this.navCtrl.navigateRoot('/menu');
	}
	
	
}
