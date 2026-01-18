import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { CreateCardDto } from './../../../core/models/card.model';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardService } from '../../../core/services/card.service';
import { ControlError } from '../../../shared/components/control-error/control-error';

@Component({
  selector: 'app-create-card-modal',
  imports: [CommonModule, ControlError, ReactiveFormsModule],
  templateUrl: './create-card-modal.html',
  styleUrl: './create-card-modal.scss',
})
export class CreateCardModal {
  @Output() close = new EventEmitter<void>();
  @Output() cardCreated = new EventEmitter<void>();
  @Input() deckId!: string;

  private cardSvc = inject(CardService);

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    frontText: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(512)]],
    answer: ['', [Validators.maxLength(512)]],
  });

  isLoading = signal(false);

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading.set(true);

    const cCardDto: CreateCardDto = {
      deckId: this.deckId,
      frontText: this.form.value.frontText!,
      backText: this.form.value.answer!,
    };

    this.cardSvc
      .createCard(cCardDto)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.cardCreated.emit();
          this.close.emit();
        },
      });
  }
}
