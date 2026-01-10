import { Deck } from './../../../core/models/deck.model';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deck-list',
  imports: [AsyncPipe],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.css',
})
export class DeckList implements OnInit {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  decks$?: Observable<Deck[]>;

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks() {
    this.decks$ = this.http.get<Deck[]>(`${this.apiUrl}/decks`);
  }

  clicked(deck: Deck) {
    console.log('clicked', deck.title);
  }
}
