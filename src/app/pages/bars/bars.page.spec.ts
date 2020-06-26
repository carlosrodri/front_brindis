import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarsPage } from './bars.page';

describe('BarsPage', () => {
  let component: BarsPage;
  let fixture: ComponentFixture<BarsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
