import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventFormPage } from './event-form.page';

describe('EventFormPage', () => {
  let component: EventFormPage;
  let fixture: ComponentFixture<EventFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
