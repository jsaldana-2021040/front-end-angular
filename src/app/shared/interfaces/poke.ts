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
  name: string;
  url: string;
  id: number;

  constructor() {
    this.count = 0;
    this.next = '';
    this.previous = '';
    this.name = '';
    this.url = '';
    this.id = 1;
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

export interface PokeDataList {
  name: string,
  url: string
}