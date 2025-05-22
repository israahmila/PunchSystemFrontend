import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierStep1Component } from './modifier-step1.component';

describe('ModifierStep1Component', () => {
  let component: ModifierStep1Component;
  let fixture: ComponentFixture<ModifierStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
