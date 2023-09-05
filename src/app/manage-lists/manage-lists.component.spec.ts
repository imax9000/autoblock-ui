import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListsComponent } from './manage-lists.component';

describe('ManageListsComponent', () => {
  let component: ManageListsComponent;
  let fixture: ComponentFixture<ManageListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageListsComponent]
    });
    fixture = TestBed.createComponent(ManageListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
