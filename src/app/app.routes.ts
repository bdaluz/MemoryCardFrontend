import { Routes } from '@angular/router';
import { DeckList } from './features/decks/deck-list/deck-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'decks',
    pathMatch: 'full',
  },
  {
    path: 'decks',
    component: DeckList,
  },
  {
    path: '**',
    redirectTo: 'decks',
  },
];
