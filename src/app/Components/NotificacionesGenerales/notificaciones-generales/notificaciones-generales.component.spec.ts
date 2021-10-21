import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificacionesGeneralesComponent } from './notificaciones-generales.component';

describe('NotificacionesGeneralesComponent', () => {
  let component: NotificacionesGeneralesComponent;
  let fixture: ComponentFixture<NotificacionesGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesGeneralesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
