export class Base {
    constructor(url, name, created) {
      this.url = url;
      this.name = name;
      this.created = created;
    }
  }
 export class People extends Base {
    static count = 1;
  
    constructor(url, name, created, id, gender, birth_year, eye_color) {
      super(url, name, created);
      // if (
      //     !film.title ||
      //     !film.url ||
      //     !film.director ||
      //     !film.release_date ||
      //     !film.episode_id ||
      //     !film.characters
      //   ) {
      //     throw new Error(" Missing required movie info!");
      //   }
      this.gender = gender;
      this.birth_year = birth_year;
      this.eye_color = eye_color;
      this.id = People.count++;
      this.date = created.substring(0, 10);
    }
  }
  export class Planets extends Base {
    static count = 1;
  
    constructor(url, name, created, id, population, climate, terrain) {
      super(url, name, created);
      // if (
      //     !film.title ||
      //     !film.url ||
      //     !film.director ||
      //     !film.release_date ||
      //     !film.episode_id ||
      //     !film.characters
      //   ) {
      //     throw new Error(" Missing required movie info!");
      //   }
      this.population = population;
      this.climate = climate;
      this.terrain = terrain;
      this.id = Planets.count++;
      this.date = created.substring(0, 10);
    }
  }
  export class Films extends Base {
    static count = 1;
  
    constructor(url, name, created, id, director, title, opening_crawl) {
      super(url, name, created);
      // if (
      //     !film.title ||
      //     !film.url ||
      //     !film.director ||
      //     !film.release_date ||
      //     !film.episode_id ||
      //     !film.characters
      //   ) {
      //     throw new Error(" Missing required movie info!");
      //   }
      this.director = director;
      this.title = title;
      this.opening_crawl = opening_crawl;
      this.id = Films.count++;
      this.date = created.substring(0, 10);
    }
  }
  export class Species extends Base {
    static count = 1;
  
    constructor(
      url,
      name,
      created,
      id,
      language,
      classification,
      average_lifespan
    ) {
      super(url, name, created);
      // if (
      //     !film.title ||
      //     !film.url ||
      //     !film.director ||
      //     !film.release_date ||
      //     !film.episode_id ||
      //     !film.characters
      //   ) {
      //     throw new Error(" Missing required movie info!");
      //   }
      this.language = language;
      this.classification = classification;
      this.average_lifespan = average_lifespan;
      this.id = Species.count++;
      this.date = created.substring(0, 10);
    }
  }
  export class Vehicles extends Base {
    static count = 1;
  
    constructor(
      url,
      name,
      created,
      id,
      model,
      passengers,
      max_atmosphering_speed
    ) {
      super(url, name, created);
      // if (
      //     !film.title ||
      //     !film.url ||
      //     !film.director ||
      //     !film.release_date ||
      //     !film.episode_id ||
      //     !film.characters
      //   ) {
      //     throw new Error(" Missing required movie info!");
      //   }
      this.model = model;
      this.passengers = passengers;
      this.max_atmosphering_speed = max_atmosphering_speed;
      this.id = Vehicles.count++;
      this.date = created.substring(0, 10);
    }
  }
  export class Starships extends Base {
    static count = 1;
  
    constructor(
      url,
      name,
      created,
      id,
      model,
      passengers,
      max_atmosphering_speed
    ) {
      super(url, name, created);
      // if (
      //     !film.title ||
      //     !film.url ||
      //     !film.director ||
      //     !film.release_date ||
      //     !film.episode_id ||
      //     !film.characters
      //   ) {
      //     throw new Error(" Missing required movie info!");
      //   }
      this.model = model;
      this.passengers = passengers;
      this.max_atmosphering_speed = max_atmosphering_speed;
      this.id = Starships.count++;
      this.date = created.substring(0, 10);
    }
  }