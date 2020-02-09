import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgreementPagePage } from './agreement-page.page';

describe('AgreementPagePage', () => {
  let component: AgreementPagePage;
  let fixture: ComponentFixture<AgreementPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgreementPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
