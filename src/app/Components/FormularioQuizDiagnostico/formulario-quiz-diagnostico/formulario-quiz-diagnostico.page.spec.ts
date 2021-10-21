import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioQuizDiagnosticoPage } from './formulario-quiz-diagnostico.page';

describe('FormularioQuizDiagnosticoPage', () => {
  let component: FormularioQuizDiagnosticoPage;
  let fixture: ComponentFixture<FormularioQuizDiagnosticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioQuizDiagnosticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioQuizDiagnosticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
