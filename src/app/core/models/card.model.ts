export interface Card {
  id: string;
  frontText: string;
  backText: string;
  deckId: string;
  nextReviewDate?: string;
}
