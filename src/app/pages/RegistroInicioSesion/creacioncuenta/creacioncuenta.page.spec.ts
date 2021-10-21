import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreacioncuentaPage } from './creacioncuenta.page';

describe('CreacioncuentaPage', () => {
  let component: CreacioncuentaPage;
  let fixture: ComponentFixture<CreacioncuentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacioncuentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreacioncuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
