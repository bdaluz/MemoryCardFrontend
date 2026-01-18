import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Card, CreateCardDto } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  // /api/decks/{deckId}/cards

  getAllDeckCards(deckId: string) {
    return this.http.get<Card[]>(`${this.apiUrl}/decks/${deckId}/cards`);
  }

  createCard(card: CreateCardDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/decks/${card.deckId}/cards`, card);
  }
}
