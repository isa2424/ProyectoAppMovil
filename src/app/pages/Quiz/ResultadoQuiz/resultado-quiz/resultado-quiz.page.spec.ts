import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultadoQuizPage } from './resultado-quiz.page';

describe('ResultadoQuizPage', () => {
  let component: ResultadoQuizPage;
  let fixture: ComponentFixture<ResultadoQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
