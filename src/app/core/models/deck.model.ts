export interface Deck {
  id: string;
  title: string;
  description: string;
}

export interface CreateDeckDto {
  title: string;
  description: string;
}
