window.onload = getBaseUrl;

const BASE_URL = "https://swapi.dev/api/";
let currentCategoryData = null;
let tableData = null;
let table;
let category;

async function getBtnNames(category) {
  const response = await fetch(`${BASE_URL}${category}`);
  currentCategoryData = await response.json();
}

async function getBaseUrl() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const buttons = document.querySelector(".dynamic-btns");
  const btnOnclick = async (event) => {
    category = event.target.innerHTML.toLowerCase();
    document.querySelector(".overlay").classList.add("active");
    document.querySelector(".pagination").classList.add("visible");
    await getBtnNames(category);

    if (category === "people") {
      tableData = currentCategoryData.results.map(
        ({ url, name, created, id, gender, birth_year, eye_color }) =>
          new People(url, name, created, id, gender, birth_year, eye_color)
      );
    }
    if (category === "planets") {
      tableData = currentCategoryData.results.map(
        ({ url, name, created, id, population, climate, terrain }) =>
          new Planets(url, name, created, id, population, climate, terrain)
      );
    }
    if (category === "films") {
      tableData = currentCategoryData.results.map(
        ({ url, name, created, id, director, title, opening_crawl }) =>
          new Films(url, name, created, id, director, title, opening_crawl)
      );
    }
    if (category === "species") {
      tableData = currentCategoryData.results.map(
        ({
          url,
          name,
          created,
          id,
          language,
          classification,
          average_lifespan,
        }) =>
          new Species(
            url,
            name,
            created,
            id,
            language,
            classification,
            average_lifespan
          )
      );
    }
    if (category === "vehicles") {
      tableData = currentCategoryData.results.map(
        ({
          url,
          name,
          created,
          id,
          model,
          passengers,
          max_atmosphering_speed,
        }) =>
          new Vehicles(
            url,
            name,
            created,
            id,
            model,
            passengers,
            max_atmosphering_speed
          )
      );
    }
    if (category === "starships") {
      tableData = currentCategoryData.results.map(
        ({
          url,
          name,
          created,
          id,
          model,
          passengers,
          max_atmosphering_speed,
        }) =>
          new Starships(
            url,
            name,
            created,
            id,
            model,
            passengers,
            max_atmosphering_speed
          )
      );
    }
    buildTable();
  };

  Object.entries(data).map(([key, value]) => {
    const btn = document.createElement("button");
    btn.innerHTML = key.toUpperCase();
    btn.addEventListener("click", btnOnclick);
    buttons.appendChild(btn);
  });
}

function buildTable() {
  table = document.querySelector(".table");
  table.innerHTML = "";

  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.innerHTML = "ID";
  tr.append(th1);

  const th2 = document.createElement("th");

  if (category === "films") {
    th2.innerHTML = "Title";
  } else {
    th2.innerHTML = "Name";
  }
  tr.append(th2);

  const th3 = document.createElement("th");
  if (category === "people") {
    th3.innerHTML = "Birth year";
  }
  if (category === "planets") {
    th3.innerHTML = "Population";
  }
  if (category === "films") {
    th3.innerHTML = "Opening crawl";
  }
  if (category === "species") {
    th3.innerHTML = "Average lifespan";
  }
  if (category === "vehicles" || category === "starships") {
    th3.innerHTML = "Model";
  }
  tr.append(th3);

  const th4 = document.createElement("th");
  if (category === "people") {
    th4.innerHTML = "Eye color";
  }
  if (category === "planets") {
    th4.innerHTML = "Climate";
  }
  if (category === "films") {
    th4.innerHTML = "Director";
  }
  if (category === "species") {
    th4.innerHTML = "Language";
  }
  if (category === "vehicles" || category === "starships") {
    th4.innerHTML = "Passengers";
  }
  tr.append(th4);

  const th5 = document.createElement("th");
  th5.innerHTML = "Url";
  tr.append(th5);

  const th6 = document.createElement("th");
  th6.innerHTML = "Created";
  tr.append(th6);

  const th7 = document.createElement("th");
  th7.innerHTML = "Delete/Details";
  tr.append(th7);

  table.append(tr);

  tableData.map((item, index) => {
    const tr = document.createElement("tr");
    tr.id = `${index + 1}`;

    const td1 = document.createElement("td");
    td1.innerHTML = tr.id;
    tr.append(td1);

    const td2 = document.createElement("td");
    if (category === "films") {
      td2.innerHTML = item.title;
    } else {
      td2.innerHTML = item.name;
    }
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    if (category === "people") {
      td3.innerHTML = item.birth_year;
    }
    if (category === "planets") {
      td3.innerHTML = item.population;
    }
    if (category === "films") {
      td3.innerHTML = item.opening_crawl;
    }
    if (category === "species") {
      td3.innerHTML = item.average_lifespan;
    }
    if (category === "vehicles" || category === "starships") {
      td3.innerHTML = item.model;
    }

    tr.append(td3);

    const td4 = document.createElement("td");
    if (category === "people") {
      td4.innerHTML = item.eye_color;
    }
    if (category === "planets") {
      td4.innerHTML = item.climate;
    }
    if (category === "films") {
      td4.innerHTML = item.director;
    }
    if (category === "species") {
      td4.innerHTML = item.language;
    }
    if (category === "vehicles" || category === "starships") {
      td4.innerHTML = item.passengers;
    }
    tr.append(td4);

    const td5 = document.createElement("td");
    td5.innerHTML = item.url;
    tr.append(td5);

    const td6 = document.createElement("td");
    td6.innerHTML = item.date;
    tr.append(td6);

    const td7 = document.createElement("td");
    td7.innerHTML = `<button class="trashBtn"><ion-icon name="trash-outline"></ion-icon></button>
    <button class="aaa"><ion-icon name="information-circle-outline"></ion-icon></button>`;
    tr.append(td7);

    table.appendChild(tr);
    console.log("data", tableData);
  });

  let popup = document.querySelector(".popup");
  const trashBtns = document.getElementsByClassName("trashBtn");
  let rowToBeDeleted = null;
  const showDeletePopup = (event) => {
    rowToBeDeleted = event.target;
    popup.style.display = "block";
  };
  [...trashBtns].forEach((event) => (event.onclick = showDeletePopup));

  const handleDelete = document
    .querySelector(".delete")
    .addEventListener("click", () => {
      rowToBeDeleted.closest("tr").remove();
      popup.style.display = "none";
    });
  const handleDoNotDelete = document
    .querySelector(".do-not-delete")
    .addEventListener("click", function () {
      popup.style.display = "none";
    });
  window.onclick = function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  };

  document.querySelector(".overlay").classList.remove("active");
  // const select = document.querySelector("#page-size");
  // let tableSize = document.querySelector(".table").rows.length - 1;

  // select.addEventListener("change", function changePageSize(event) {

  // });
}

class Base {
  constructor(url, name, created) {
    this.url = url;
    this.name = name;
    this.created = created;
  }
}
class People extends Base {
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
class Planets extends Base {
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
class Films extends Base {
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
class Species extends Base {
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
class Vehicles extends Base {
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
class Starships extends Base {
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
