import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreguntasQuizDiagnosticoPage } from './preguntas-quiz-diagnostico.page';

describe('PreguntasQuizDiagnosticoPage', () => {
  let component: PreguntasQuizDiagnosticoPage;
  let fixture: ComponentFixture<PreguntasQuizDiagnosticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntasQuizDiagnosticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntasQuizDiagnosticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
