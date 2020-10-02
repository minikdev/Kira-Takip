import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HirerDetailPage } from './hirer-detail.page';

describe('HirerDetailPage', () => {
  let component: HirerDetailPage;
  let fixture: ComponentFixture<HirerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirerDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HirerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
