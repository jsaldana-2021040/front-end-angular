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

  constructor () {
    this.effect_entries= [
      {
        effect: '',
        language: {
          name: '',
          url: ''
        },
        short_effect: ''
      }
    ]
  }
}