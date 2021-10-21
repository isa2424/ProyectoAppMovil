import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioQuizPage } from './formulario-quiz.page';

describe('FormularioQuizPage', () => {
  let component: FormularioQuizPage;
  let fixture: ComponentFixture<FormularioQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
