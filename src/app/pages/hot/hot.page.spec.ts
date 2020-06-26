import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HotPage } from './hot.page';

describe('HotPage', () => {
  let component: HotPage;
  let fixture: ComponentFixture<HotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
