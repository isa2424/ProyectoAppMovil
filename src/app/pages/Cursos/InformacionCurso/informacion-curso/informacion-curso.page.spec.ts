import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformacionCursoPage } from './informacion-curso.page';

describe('InformacionCursoPage', () => {
  let component: InformacionCursoPage;
  let fixture: ComponentFixture<InformacionCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionCursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
