import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  getAll() {
    return this.http.get<Deck[]>(`${this.apiUrl}/decks`);
  }
}
