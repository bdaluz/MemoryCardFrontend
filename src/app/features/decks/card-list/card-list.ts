import { CardService } from './../../../core/services/card.service';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { AppHeader } from '../../../shared/components/app-header/app-header';
import { CreateCardModal } from '../create-card-modal/create-card-modal';
import { toSignal, toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card-list',
  imports: [RouterModule, AppHeader, CreateCardModal],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardList {
  private route = inject(ActivatedRoute);
  private cardSvc = inject(CardService);

  modalOpen = signal(false);
  deckId = this.route.snapshot.paramMap.get('id')!;
  private refreshTrigger = signal(0);

  cards = toSignal(
    toObservable(this.refreshTrigger).pipe(
      switchMap(() => this.cardSvc.getAllDeckCards(this.deckId)),
      takeUntilDestroyed(),
    ),
    { initialValue: null },
  );

  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }

  refreshCardList() {
    this.refreshTrigger.update((v) => v + 1);
  }
}
