import { CreateDeckModal } from './../create-deck-modal/create-deck-modal';
import { Deck } from './../../../core/models/deck.model';
import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, Observable, tap } from 'rxjs';
import { DeckService } from '../../../core/services/deck.service';
import { RouterModule } from '@angular/router';
import { AppHeader } from '../../../shared/components/app-header/app-header';

@Component({
  selector: 'app-deck-list',
  imports: [AsyncPipe, RouterModule, AppHeader, CreateDeckModal],
  templateUrl: './deck-list.html',
  styleUrls: ['deck-list.scss'],
})
export class DeckList {
  deckSvc = inject(DeckService);
  error = signal<string | null>(null);
  isLoading = signal(true);

  decks$?: Observable<Deck[]> = this.deckSvc.getAll().pipe(
    tap(() => {
      this.error.set(null);
      this.isLoading.set(false);
    }),
    catchError((err) => {
      this.error.set('Failed to load decks.');
      this.isLoading.set(false);
      return [];
    }),
  );

  modalOpen: boolean = false;

  openModal() {
    if (!this.isLoading()) {
      this.modalOpen = true;
    }
  }

  closeModal() {
    this.modalOpen = false;
  }

  refreshList() {
    this.decks$ = this.deckSvc.getAll();
  }
}
