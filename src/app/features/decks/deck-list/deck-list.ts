import { Deck } from './../../../core/models/deck.model';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DeckService } from '../../../core/services/deck.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  imports: [AsyncPipe, RouterModule],
  templateUrl: './deck-list.html',
  styleUrls: ['deck-list.scss'],
})
export class DeckList {
  deckSvc = inject(DeckService);
  decks$?: Observable<Deck[]> = this.deckSvc.getAll();
}
