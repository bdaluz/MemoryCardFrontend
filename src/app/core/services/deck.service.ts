import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateDeckDto, Deck } from '../models/deck.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/decks`;

  getAll() {
    return this.http.get<Deck[]>(this.apiUrl);
  }

  create(deck: CreateDeckDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, deck);
  }

  deleteDeck(deckId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${deckId}`);
  }
}
