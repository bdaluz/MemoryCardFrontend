import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardModal } from './create-card-modal';

describe('CreateCardModal', () => {
  let component: CreateCardModal;
  let fixture: ComponentFixture<CreateCardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
