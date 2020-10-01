import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HousesTableComponent } from './houses-table.component';

describe('HousesTableComponent', () => {
  let component: HousesTableComponent;
  let fixture: ComponentFixture<HousesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousesTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HousesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
