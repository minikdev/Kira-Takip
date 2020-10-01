import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RentTableComponent } from './rent-table.component';

describe('RentTableComponent', () => {
  let component: RentTableComponent;
  let fixture: ComponentFixture<RentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
