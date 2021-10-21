import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursoDisponiblesPage } from './curso-disponibles.page';

describe('CursoDisponiblesPage', () => {
  let component: CursoDisponiblesPage;
  let fixture: ComponentFixture<CursoDisponiblesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoDisponiblesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoDisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
