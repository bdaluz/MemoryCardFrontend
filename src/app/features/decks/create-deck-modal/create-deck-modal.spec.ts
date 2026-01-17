import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeckModal } from './create-deck-modal';

describe('CreateDeckModal', () => {
  let component: CreateDeckModal;
  let fixture: ComponentFixture<CreateDeckModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDeckModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeckModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
