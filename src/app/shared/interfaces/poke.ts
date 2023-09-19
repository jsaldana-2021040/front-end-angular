export interface PokeItems {
  name: string,
  url: string
}

export class Poke{
  count: number;
  next: string;
  previous: string;
  results: PokeItems[];

  constructor () {
    this.count = 0;
    this.next = '';
    this.previous = '';
    this.results = [];
  }
}