import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HirersTableComponent } from './hirers-table.component';

describe('HirersTableComponent', () => {
  let component: HirersTableComponent;
  let fixture: ComponentFixture<HirersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirersTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HirersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
