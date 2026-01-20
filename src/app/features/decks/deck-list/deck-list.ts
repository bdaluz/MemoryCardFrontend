import { CreateDeckModal } from './../create-deck-modal/create-deck-modal';
import { Deck } from './../../../core/models/deck.model';
import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, Observable, tap } from 'rxjs';
import { DeckService } from '../../../core/services/deck.service';
import { RouterModule } from '@angular/router';
import { AppHeader } from '../../../shared/components/app-header/app-header';
import { ConfirmationModal } from '../../../shared/components/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-deck-list',
  imports: [AsyncPipe, RouterModule, AppHeader, CreateDeckModal, ConfirmationModal],
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

  modalOpen = signal(false);
  deleteModalOpen = signal(false);
  deckToDelete = signal<Deck | null>(null);

  openModal() {
    if (!this.isLoading()) {
      this.modalOpen.set(true);
    }
  }

  closeModal() {
    this.modalOpen.set(false);
  }

  refreshList() {
    this.decks$ = this.deckSvc.getAll();
  }

  openDeleteDiag(deck: Deck) {
    this.deckToDelete.set(deck);
    this.deleteModalOpen.set(true);
  }

  onDeleteConfirmed() {
    const deck = this.deckToDelete();
    if (deck) {
      this.deckSvc.deleteDeck(deck.id).subscribe(() => {
        this.refreshList();
        this.closeDeleteModal();
      });
    }
  }

  closeDeleteModal() {
    this.deleteModalOpen.set(false);
    this.deckToDelete.set(null);
  }

  openEditModal(deck: Deck) {
    console.log('Clicked' + deck.id);
  }
}
