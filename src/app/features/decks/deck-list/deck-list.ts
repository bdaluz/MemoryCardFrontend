import { CreateDeckModal } from './../create-deck-modal/create-deck-modal';
import { Deck } from './../../../core/models/deck.model';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
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
  decks$?: Observable<Deck[]> = this.deckSvc.getAll();

  modalOpen: boolean = false;

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  refreshList() {
    this.decks$ = this.deckSvc.getAll();
  }
}
