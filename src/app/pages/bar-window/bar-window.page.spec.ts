import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarWindowPage } from './bar-window.page';

describe('BarWindowPage', () => {
  let component: BarWindowPage;
  let fixture: ComponentFixture<BarWindowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarWindowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarWindowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
