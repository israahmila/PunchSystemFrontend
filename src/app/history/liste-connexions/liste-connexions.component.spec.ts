import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConnexionsComponent } from './liste-connexions.component';

describe('ListeConnexionsComponent', () => {
  let component: ListeConnexionsComponent;
  let fixture: ComponentFixture<ListeConnexionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeConnexionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeConnexionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
