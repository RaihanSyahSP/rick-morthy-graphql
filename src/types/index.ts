export interface Characters {
  characters: CharactersClass;
}

export interface CharactersClass {
  results: ResultCharacters[];
}

export interface ResultCharacters {
  name: string;
  id: string;
  image: string;
}

export interface CharacterByID {
  character: Character;
}

export interface Character {
  id: string;
  name: string;
  status: "Alive" | "Death" | "Unknown";
  species: string;
  gender: string;
  image: string;
  created?: string;
  type?: string;
  origin?: string;
}

export interface Episodes {
  episodes: EpisodesClass;
}

export interface EpisodesClass {
  results: ResultEpisodes[];
}

export interface ResultEpisodes {
  id: string;
  name: string;
  air_date: string;
  characters: Character[];
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  created: string;
}
