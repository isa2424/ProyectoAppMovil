import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursoFavoritosPage } from './curso-favoritos.page';

describe('CursoFavoritosPage', () => {
  let component: CursoFavoritosPage;
  let fixture: ComponentFixture<CursoFavoritosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoFavoritosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoFavoritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
