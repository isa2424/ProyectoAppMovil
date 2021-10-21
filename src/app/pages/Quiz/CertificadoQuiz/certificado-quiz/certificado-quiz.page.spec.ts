import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CertificadoQuizPage } from './certificado-quiz.page';

describe('CertificadoQuizPage', () => {
  let component: CertificadoQuizPage;
  let fixture: ComponentFixture<CertificadoQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
