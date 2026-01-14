import { Routes } from '@angular/router';
import { CardList } from './features/decks/card-list/card-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'decks',
    pathMatch: 'full',
  },
  {
    path: 'decks',
    loadComponent: () => import('./features/decks/deck-list/deck-list').then((m) => m.DeckList),
  },
  {
    path: 'cards/:id',
    component: CardList,
  },
  {
    path: '**',
    redirectTo: 'decks',
  },
];
