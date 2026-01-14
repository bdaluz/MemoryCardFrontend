import { CardService } from './../../../core/services/card.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../../../core/models/card.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-card-list',
  imports: [AsyncPipe, RouterModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  private route = inject(ActivatedRoute);
  private cardSvc = inject(CardService);
  info = this.route.snapshot.paramMap.get('id')!;

  cards$?: Observable<Card[]> = this.cardSvc.getAllDeckCards(this.info);
}
