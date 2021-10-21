import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorialesVideosPage } from './tutoriales-videos.page';

describe('TutorialesVideosPage', () => {
  let component: TutorialesVideosPage;
  let fixture: ComponentFixture<TutorialesVideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialesVideosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialesVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
