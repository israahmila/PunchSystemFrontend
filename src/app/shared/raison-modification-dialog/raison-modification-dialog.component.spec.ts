import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisonModificationDialogComponent } from './raison-modification-dialog.component';

describe('RaisonModificationDialogComponent', () => {
  let component: RaisonModificationDialogComponent;
  let fixture: ComponentFixture<RaisonModificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaisonModificationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaisonModificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
