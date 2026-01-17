import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-error',
  imports: [],
  template: `
    @if (errorMessage) {
      <p class="error-text">{{ errorMessage }}</p>
    }
  `,
  styles: [
    `
      .error-text {
        font-size: 0.75rem;
        color: var(--error);
        animation: fadeIn 0.2s ease-in;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-2px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class ControlError {
  @Input() control: AbstractControl | null = null;
  @Input() label: string = 'Field';

  get errorMessage(): string {
    if (!this.control || !this.control.touched || !this.control.errors) {
      return '';
    }

    const errors = this.control.errors;

    if (errors['required']) {
      return `${this.label} is required.`;
    }
    if (errors['minlength']) {
      return `${this.label} must be at least ${errors['minlength'].requiredLength} characters.`;
    }
    if (errors['maxlength']) {
      return `${this.label} must be ${errors['maxlength'].requiredLength} characters or fewer.`;
    }
    return `${this.label} is invalid.`;
  }
}
