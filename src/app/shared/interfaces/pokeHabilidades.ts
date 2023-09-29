export class PokeHabilidades {
  effect_entries: [
    {
      effect: string,
      language: {
        name: string,
        url: string
      },
      short_effect: string
    }
  ]
  name: string

  type: {
    name: string,
    url: string
  }

  constructor() {
    this.effect_entries = [
      {
        effect: '',
        language: {
          name: '',
          url: ''
        },
        short_effect: ''
      }
    ]
    this.name = ''

    this.type = {
      name: '',
      url: ''
    }
  }
}