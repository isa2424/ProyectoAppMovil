import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreguntasQuizPage } from './preguntas-quiz.page';

describe('PreguntasQuizPage', () => {
  let component: PreguntasQuizPage;
  let fixture: ComponentFixture<PreguntasQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntasQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntasQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
