import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStep3Component } from './ajouter-step3.component';

describe('AjouterStep3Component', () => {
  let component: AjouterStep3Component;
  let fixture: ComponentFixture<AjouterStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterStep3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
