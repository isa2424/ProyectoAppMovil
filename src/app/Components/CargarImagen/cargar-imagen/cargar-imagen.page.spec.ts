import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CargarImagenPage } from './cargar-imagen.page';

describe('CargarImagenPage', () => {
  let component: CargarImagenPage;
  let fixture: ComponentFixture<CargarImagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarImagenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CargarImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
