import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjouterModifierEntretienComponent } from './dialog-ajouter-modifier-entretien.component';

describe('DialogAjouterModifierEntretienComponent', () => {
  let component: DialogAjouterModifierEntretienComponent;
  let fixture: ComponentFixture<DialogAjouterModifierEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAjouterModifierEntretienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAjouterModifierEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
