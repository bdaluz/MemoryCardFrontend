import { CreateDeckDto } from './../../../core/models/deck.model';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeckService } from '../../../core/services/deck.service';
import { finalize } from 'rxjs';
import { ControlError } from '../../../shared/components/control-error/control-error';

@Component({
  selector: 'app-create-deck-modal',
  imports: [CommonModule, ReactiveFormsModule, ControlError],
  templateUrl: './create-deck-modal.html',
  styleUrl: './create-deck-modal.scss',
})
export class CreateDeckModal {
  @Output() close = new EventEmitter<void>();
  @Output() deckCreated = new EventEmitter<void>();

  private deckSvc = inject(DeckService);

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.maxLength(100)]],
  });

  isLoading = signal(false);

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading.set(true);

    const cdeckDto: CreateDeckDto = {
      title: this.form.value.title!,
      description: this.form.value.description!,
    };

    this.deckSvc
      .create(cdeckDto)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.deckCreated.emit();
          this.close.emit();
        },
      });
  }
}
