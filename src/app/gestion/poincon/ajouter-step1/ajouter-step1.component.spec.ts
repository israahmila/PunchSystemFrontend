import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStep1Component } from './ajouter-step1.component';

describe('AjouterStep1Component', () => {
  let component: AjouterStep1Component;
  let fixture: ComponentFixture<AjouterStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
