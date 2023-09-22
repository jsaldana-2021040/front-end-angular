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

export class Poke{
  count: number;
  next: string;
  previous: string;
  results: PokeItems[];

  id: number
  base_experience: number;
  abilities: PokeDataAbilities[];

  forms: [
    {
      name: string,
      url: string
    }
  ];
  
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
  ]

  constructor () {
    this.count = 0;
    this.next = '';
    this.previous = '';
    this.results = [];

    this.id = 0
    this.base_experience = 0
    this.abilities = []
    
    this.forms = [
      {
        name: '',
        url: ''
      }
    ]
    
    this.types = [
      {
        type: {
          name: '',
        }
      }
    ]

    this.stats= [
      {
          base_stat: 0,
          effort: 0,
          stat: {
              name: '',
              url: ''
          }
      }
    ]

  }
}