import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjouterModifierUtilisateurComponent } from './dialog-ajouter-modifier-utilisateur.component';

describe('DialogAjouterModifierUtilisateurComponent', () => {
  let component: DialogAjouterModifierUtilisateurComponent;
  let fixture: ComponentFixture<DialogAjouterModifierUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAjouterModifierUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAjouterModifierUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
