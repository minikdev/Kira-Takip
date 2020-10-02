import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewHirerComponent } from './new-hirer.component';

describe('NewHirerComponent', () => {
  let component: NewHirerComponent;
  let fixture: ComponentFixture<NewHirerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHirerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewHirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
