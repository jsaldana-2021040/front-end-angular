export interface PokeDataPreviewItems {
  ability: {
    name: string,
    url: string
  },
  is_hidden: boolean,
  slot: number
}



export class PokeDataPreview {
  id: number
  abilities: PokeDataPreviewItems[]

  forms: [
    {
      name: string,
      url: string
    }
  ]
  
  types: [
    {
      type: {
        name: string,
      }
    }
  ]

  constructor() {
    this.id = 0
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

  }
}

