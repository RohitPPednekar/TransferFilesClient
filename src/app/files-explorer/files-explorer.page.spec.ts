import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilesExplorerPage } from './files-explorer.page';

describe('FilesExplorerPage', () => {
  let component: FilesExplorerPage;
  let fixture: ComponentFixture<FilesExplorerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesExplorerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilesExplorerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
