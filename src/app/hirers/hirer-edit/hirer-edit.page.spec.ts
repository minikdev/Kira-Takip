import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HirerEditPage } from './hirer-edit.page';

describe('HirerEditPage', () => {
  let component: HirerEditPage;
  let fixture: ComponentFixture<HirerEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirerEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HirerEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
