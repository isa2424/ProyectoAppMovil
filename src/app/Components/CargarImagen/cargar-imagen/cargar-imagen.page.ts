import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChange, ViewChildren } from '@angular/core';
import { isPresent } from './ArchivoTs';

@Component({
  selector: 'cargar-imagen',
  templateUrl: './cargar-imagen.page.html',
  styleUrls: ['./cargar-imagen.page.scss'],
})
export class CargarImagenPage  implements OnChanges {
	@ViewChildren("img") components;
  _src: string = '';
	_ratio: { w: number, h: number };
  _img: any;

	constructor(public _elementRef: ElementRef, public _renderer: Renderer2) {
    this._img = new Image();
  }
  

	@Input() alt: string;

  @Input() title: string;

	@Input() set src(val: string) {
    this._src = isPresent(val) ? val : '';
  }

	@Input() set ratio(ratio: { w: number, h: number }){
		this._ratio = ratio || null;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    
    this._update();
    // console.log("CHANGES preload-image", this._src);
    // console.log(changes['src'].isFirstChange());
  }

	_update() {
	  if (isPresent(this.alt)) {
	    this._img.alt = this.alt;
	  }
	  if (isPresent(this.title)) {
	    this._img.title = this.title;
	  }

	  this._img.addEventListener('load', () => {
	  this._elementRef.nativeElement.appendChild(this._img);
	
	  this._renderer.setStyle(this._elementRef.nativeElement.appendChild(this._img), 'width', (100)+'%');
		this._renderer.setStyle(this._elementRef.nativeElement.appendChild(this._img), 'height', (100)+'%');
		this._renderer.setStyle(this._elementRef.nativeElement.appendChild(this._img), 'border-radius', (35.5)+'px');
		this._renderer.setStyle(this._elementRef.nativeElement.appendChild(this._img), 'border', '3px solid #97aeb4');
		
    
			this._loaded(true);
			
	  });

	  this._img.src = this._src;

	  this._loaded(false);
	}

	_loaded(isLoaded: boolean) {
    this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
  }

}
