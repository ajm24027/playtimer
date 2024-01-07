export const timerStyles = {
  lorcana: {
    backgroundImage:
      "url('https://d2v9ou34ah9m2h.cloudfront.net/Lorcana.png')",
    borderColor: "#ff9900",
    boxShadow: "rgba(255,153,0,0.63)",
  },
  mtg: {
    backgroundImage: "url('https://d2v9ou34ah9m2h.cloudfront.net/mtg.png')",
    borderColor: "#FF6666",
    boxShadow: "rgba(255,102,102,0.63)",
  },
  bss: {
    backgroundImage: "url('https://d2v9ou34ah9m2h.cloudfront.net/bss.png')",
    borderColor: "#00FFBF",
    boxShadow: "rgba(0,255,191,0.63)",
  },
  fab: {
    backgroundImage: "url('https://d2v9ou34ah9m2h.cloudfront.net/fab.png')",
    borderColor: "#FFFF00",
    boxShadow: "rgba(255,255,0,0.63)",
  },
  pokemon: {
    backgroundImage:
      "url('https://d2v9ou34ah9m2h.cloudfront.net/pokemon.png')",
    borderColor: "#00CCFF",
    boxShadow: "rgba(0,204,255,0.63)",
  },
  digimon: {
    backgroundImage:
      "url('https://d2v9ou34ah9m2h.cloudfront.net/digimon.png')",
    borderColor: "#0099CD",
    boxShadow: "rgba(0,153,205,0.63)",
  },
  shadowverse: {
    backgroundImage:
      "url('https://d2v9ou34ah9m2h.cloudfront.net/Shadowverse.png')",
    borderColor: "#2A52BE",
    boxShadow: "rgba(42,82,190,0.63)",
  },
  dragonball: {
    backgroundImage:
      "url('https://d2v9ou34ah9m2h.cloudfront.net/dragonball.png')",
    borderColor: "#00ED00",
    boxShadow: "rgba(0,237,0,0.63)",
  },
  onepiece: {
    backgroundImage:
      "url('https://d2v9ou34ah9m2h.cloudfront.net/onepiece.png')",
    borderColor: "#FF0000",
    boxShadow: "rgba(255,0,0,0.63)",
  },
}

export type GameKey = keyof typeof timerStyles