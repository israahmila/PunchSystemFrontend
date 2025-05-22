import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStep2Component } from './ajouter-step2.component';

describe('AjouterStep2Component', () => {
  let component: AjouterStep2Component;
  let fixture: ComponentFixture<AjouterStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
