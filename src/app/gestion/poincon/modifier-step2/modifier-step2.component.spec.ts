import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierStep2Component } from './modifier-step2.component';

describe('ModifierStep2Component', () => {
  let component: ModifierStep2Component;
  let fixture: ComponentFixture<ModifierStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
