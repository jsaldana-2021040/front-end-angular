export interface PokeItems {
  name: string,
  url: string
}

export interface PokeDataAbilities {
  ability: {
    name: string,
    url: string
  },
  is_hidden: boolean,
  slot: number
}

export class Poke {
  count: number;
  next: string;
  previous: string;
  results: PokeItems[];

  constructor() {
    this.count = 0;
    this.next = '';
    this.previous = '';
    this.results = [];
  }
}

export interface PokeData {
  id: number
  base_experience: number;
  name: string;
  abilities: PokeDataAbilities[];

  types: [
    {
      type: {
        name: string,
      }
    }
  ];

  stats: [
    {
      base_stat: number,
      effort: number,
      stat: {
        name: string,
        url: string
      }
    }
  ];

  moves: [
    {
      move: {
        name: string,
        url: string
      }
    }
  ]
}