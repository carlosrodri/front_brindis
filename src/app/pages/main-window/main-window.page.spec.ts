import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainWindowPage } from './main-window.page';

describe('MainWindowPage', () => {
  let component: MainWindowPage;
  let fixture: ComponentFixture<MainWindowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainWindowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainWindowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
