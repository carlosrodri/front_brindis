import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentWindowPage } from './payment-window.page';

describe('PaymentWindowPage', () => {
  let component: PaymentWindowPage;
  let fixture: ComponentFixture<PaymentWindowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWindowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentWindowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
