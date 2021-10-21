import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StarRatingPage } from './star-rating.page';

describe('StarRatingPage', () => {
  let component: StarRatingPage;
  let fixture: ComponentFixture<StarRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarRatingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
