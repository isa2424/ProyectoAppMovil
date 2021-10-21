export class VideoModel {
	title: string;
	description: string;
	thumbnail: string;
	sources: Array<{Direccion_Video: string, Tipo: string}>;

	constructor (
		title: string,
		description: string,
		thumbnail: string,
		sources: Array<{Direccion_Video: string, Tipo: string}>
	) {
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
		this.sources = sources;
	}
}

export class VideoPlaylistModel {
  selected_video: any;
  video_playlist: Array<VideoModel> = [];

	constructor () {
		let __video_1 = new VideoModel(
			'Capitulo 1:Introducción',
			'La tecnología IoT está evolucionando y se ha convertido en una mayor corriente mundial con miles de millones de dispositivos conectados hoy en día. Con todos esos dispositivos y sensores viene una gran cantidad de datos que proporciona a las organizaciones oportunidades para transformar la experiencia del cliente, optimizar las operaciones y crear nuevos negocios.',
			'./assets/images/video-playlist/big_buck_bunny.png',
			[
				{
					Direccion_Video: "http://localhost/ProyectoIsabel/Videos/video1.mp4",
					Tipo: "video/mp4"
				}
			]
		);
		let __video_2 = new VideoModel(
			'Capitulo 2: Mundo Tecnologico',
			'Todo lo que nos rodea es tecnología. Es el presente y el futuro. Se cuela en la medicina, el arte, la ciencia y la cultura, y evoluciona a pasos agigantados. Y ante toda esa vorágine tecnológica a nuestro alrededor, seguro que algo les llamaba especialmente la atención.',
			'./assets/images/video-playlist/earth_seen_from_iss.png',
			[
				{
					Direccion_Video: "http://localhost/ProyectoIsabel/Videos/video2.mp4",
					Tipo: "video/mp4"
				}
			]
		);
		let __video_3 = new VideoModel(
			'Capitulo 3: La seguridad digital',
			'La ciberseguridad o la seguridad digital es el área de una empresa u organización enfocada en procesos informáticos y telemáticos para proteger toda la infraestructura física y digital relacionada con la tecnología computacional —también puede definirse como la capa de protección para los archivos de información digital.',
			'./assets/images/video-playlist/elephants_dream.png',
			[
				{
					Direccion_Video: "http://localhost/ProyectoIsabel/Videos/video3.mp4",
					Tipo: "video/mp4"
				}
			]
		);
		let __video_4 = new VideoModel(
			'Capitulo 4: La seguridad digital',
			'La ciberseguridad o la seguridad digital es el área de una empresa u organización enfocada en procesos informáticos y telemáticos para proteger toda la infraestructura física y digital relacionada con la tecnología computacional —también puede definirse como la capa de protección para los archivos de información digital.',
			'./assets/images/video-playlist/elephants_dream.png',
			[
				{
					Direccion_Video: "http://localhost/ProyectoIsabel/Videos/video1.mp4",
					Tipo: "video/mp4"
				}
			]
		);
		let __video_5 = new VideoModel(
			'Capitulo 5: La seguridad digital',
			'La ciberseguridad o la seguridad digital es el área de una empresa u organización enfocada en procesos informáticos y telemáticos para proteger toda la infraestructura física y digital relacionada con la tecnología computacional —también puede definirse como la capa de protección para los archivos de información digital.',
			'./assets/images/video-playlist/elephants_dream.png',
			[
				{
					Direccion_Video: "http://localhost/ProyectoIsabel/Videos/video2.mp4",
					Tipo: "video/mp4"
				}
			]
		);
		let __video_6 = new VideoModel(
			'Capitulo 6: La seguridad digital',
			'La ciberseguridad o la seguridad digital es el área de una empresa u organización enfocada en procesos informáticos y telemáticos para proteger toda la infraestructura física y digital relacionada con la tecnología computacional —también puede definirse como la capa de protección para los archivos de información digital.',
			'./assets/images/video-playlist/elephants_dream.png',
			[
				{
					Direccion_Video: "http://localhost/ProyectoIsabel/Videos/video3.mp4",
					Tipo: "video/mp4"
				}
			]
		);


		this.video_playlist.push(__video_1);
		this.video_playlist.push(__video_2);
		this.video_playlist.push(__video_3);
		this.video_playlist.push(__video_4);
		this.video_playlist.push(__video_5);
		this.video_playlist.push(__video_6);

		this.selected_video = this.video_playlist[0];
	}
}
