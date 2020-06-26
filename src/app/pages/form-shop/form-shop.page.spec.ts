import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormShopPage } from './form-shop.page';

describe('FormShopPage', () => {
  let component: FormShopPage;
  let fixture: ComponentFixture<FormShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
