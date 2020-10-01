import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HirerEditComponent } from './hirer-edit.component';

describe('HirerEditComponent', () => {
  let component: HirerEditComponent;
  let fixture: ComponentFixture<HirerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirerEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HirerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
