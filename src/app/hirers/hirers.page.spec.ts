import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HirersPage } from './hirers.page';

describe('HirersPage', () => {
  let component: HirersPage;
  let fixture: ComponentFixture<HirersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HirersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
