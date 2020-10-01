import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HirerProfilePage } from './hirer-profile.page';

describe('HirerProfilePage', () => {
  let component: HirerProfilePage;
  let fixture: ComponentFixture<HirerProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirerProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HirerProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
