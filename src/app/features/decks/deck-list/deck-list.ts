import { Deck } from './../../../core/models/deck.model';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DeckService } from '../../../core/services/deck.service';

@Component({
  selector: 'app-deck-list',
  imports: [AsyncPipe],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.css',
})
export class DeckList {
  deckSvc = inject(DeckService);
  decks$?: Observable<Deck[]> = this.deckSvc.getAll();

  clicked(deck: Deck) {
    console.log('clicked', deck.title);
  }
}
