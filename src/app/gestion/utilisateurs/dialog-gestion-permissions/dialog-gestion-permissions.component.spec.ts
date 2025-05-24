import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGestionPermissionsComponent } from './dialog-gestion-permissions.component';

describe('DialogGestionPermissionsComponent', () => {
  let component: DialogGestionPermissionsComponent;
  let fixture: ComponentFixture<DialogGestionPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogGestionPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGestionPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
