import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarCommentsPage } from './bar-comments.page';

describe('BarCommentsPage', () => {
  let component: BarCommentsPage;
  let fixture: ComponentFixture<BarCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
