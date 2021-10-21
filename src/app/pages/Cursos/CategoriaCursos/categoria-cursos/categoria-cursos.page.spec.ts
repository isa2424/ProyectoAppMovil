import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriaCursosPage } from './categoria-cursos.page';

describe('CategoriaCursosPage', () => {
  let component: CategoriaCursosPage;
  let fixture: ComponentFixture<CategoriaCursosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaCursosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
