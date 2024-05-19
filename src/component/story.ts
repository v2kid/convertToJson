interface Environment {
  event: string;
  landscape: string;
  climate: string;
  monster: string;
}

interface Character {
  name: string;
  age: number;
  role: string;
  background: string;
  personality: string;
}

interface Plot {
  beginning: {
    summary: string;
    conflict: string;
  };
}

interface Story {
  title: string;
  setting: {
    world: string;
    year: number;
    environment: Environment;
  };
  characters: Character[];
  plot: Plot;
  themes: string[];
}

const story = {
  title: "Endless Horizon",
  setting: {
    world: "Post-apocalyptic Earth",
    year: 2150,
    environment: {
      event: "Meteorite impact",
      landscape:
        "Ruined cities and new monster come after the meteorite hit the earth.",
      climate: "Harsh with unpredictable weather patterns",
      monster:
        "Metoerite bring sickness to the earth alse a new engery resource that can be use to power up the city. sickness mutate the human and animal to a new monster that can be found in the wild.",
    },
  },
  plot: {
    beginning: {
      summary:
        "150 year after the apocalyptic event, human start to rebuild the city and the community.They found a new energy resource from meteorite that can be use to power up the city and every one seek that energy from wild",
      conflict:
        "Every side from the city want to dispute that energy, a lot of Associations and new goverment form to control the energy and the monster that come after the meteorite hit the earth.",
    },
  },
  themes: "Survival, Community, Resilience, Power struggle Hard weather"
};
export default story;
