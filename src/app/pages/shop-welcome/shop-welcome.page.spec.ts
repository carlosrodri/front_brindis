import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopWelcomePage } from './shop-welcome.page';

describe('ShopWelcomePage', () => {
  let component: ShopWelcomePage;
  let fixture: ComponentFixture<ShopWelcomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopWelcomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopWelcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
