export interface Card {
  id: string;
  frontText: string;
  backText: string;
  deckId: string;
  nextReviewDate?: string;
}

export interface CreateCardDto {
  deckId: string;
  frontText: string;
  backText: string;
}
