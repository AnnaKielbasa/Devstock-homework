window.onload = getData;

const BASE_URL = "https://swapi.dev/api/";
let currentCategoryData;
let tableData;
let table;
let category;
let allResults = [];
const pageSize = 10;
let curPage = 1;

async function getBtnNames(category) {
  let url = `${BASE_URL}${category}`;
  while (url) {
    const response = await fetch(url);
    currentCategoryData = await response.json();
    allResults.push(...currentCategoryData.results);
    url = currentCategoryData.next;
  }
  return allResults;
}

async function getData() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const buttons = document.querySelector(".dynamic-btns");
  const btnOnclick = async (event) => {
    category = event.target.innerHTML.toLowerCase();
    document.querySelector(".overlay").classList.add("active");
    document.querySelector(".pagination").classList.add("visible");
    await getBtnNames(category);

    if (category === "people") {
      tableData = allResults.map(
        ({ url, name, created, id, gender, birth_year, eye_color }) =>
          new People(url, name, created, id, gender, birth_year, eye_color)
      );
    }
    if (category === "planets") {
      tableData = allResults.map(
        ({ url, name, created, id, population, climate, terrain }) =>
          new Planets(url, name, created, id, population, climate, terrain)
      );
    }
    if (category === "films") {
      tableData = allResults.map(
        ({ url, name, created, id, director, title, opening_crawl }) =>
          new Films(url, name, created, id, director, title, opening_crawl)
      );
    }
    if (category === "species") {
      tableData = allResults.map(
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
      tableData = allResults.map(
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
      tableData = allResults.map(
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

  Object.entries(data).map(([key]) => {
    const btn = document.createElement("button");
    btn.innerHTML = key.toUpperCase();
    btn.addEventListener("click", btnOnclick);
    buttons.appendChild(btn);
  });
}

function buildTable(page = 1) {
  if (page == 1) {
    prevBtn.style.visibility = "hidden";
  } else {
    prevBtn.style.visibility = "visible";
  }

  if (page == numPages()) {
    nextBtn.style.visibility = "hidden";
  } else {
    nextBtn.style.visibility = "visible";
  }
  table = "";
  table += `<th>ID</th>
  <th>URL</th>`;
  if (category === "films") {
    table += `<th>Title</th>`;
  } else {
    table += `<th>Name</th>`;
  }

  if (category === "people") {
    table += `<th>Birth year</th>`;
  }

  if (category === "planets") {
    table += `<th>Population</th>`;
  }

  if (category === "films") {
    table += `<th>Opening crawl</th>`;
  }

  if (category === "species") {
    table += `<th>Average lifespan</th>`;
  }

  if (category === "vehicles" || category === "starships") {
    table += `<th>Model</th>`;
  }

  if (category === "people") {
    table += `<th>Eye color</th>`;
  }

  if (category === "planets") {
    table += `<th>Climate</th>`;
  }

  if (category === "films") {
    table += `<th>Director</th>`;
  }

  if (category === "species") {
    table += `<th>Language</th>`;
  }

  if (category === "vehicles" || category === "starships") {
    table += `<th>Passengers</th>`;
  }

  table += `<th>Created</th>`;
  table += `<th>Delete/Details</th>`;

  const filtered = tableData
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((item, index) => {
      table += "<tr>";
      table += `<td>${index + 1}</td>`;
      table += `<td>${item.url}</td>`;
      if (category === "films") {
        table += `<td>${item.title}</td>`;
      } else {
        table += `<td>${item.name}</td>`;
      }

      if (category === "people") {
        table += `<td>${item.birth_year}</td>`;
      }

      if (category === "planets") {
        table += `<td>${item.population}</td>`;
      }

      if (category === "films") {
        table += `<td>${item.opening_crawl}</td>`;
      }

      if (category === "species") {
        table += `<td>${item.average_lifespan}</td>`;
      }

      if (category === "vehicles" || category === "starships") {
        table += `<td>${item.model}</td>`;
      }
      if (category === "people") {
        table += `<td>${item.eye_color}</td>`;
      }

      if (category === "planets") {
        table += `<td>${item.climate}</td>`;
      }

      if (category === "films") {
        table += `<td>${item.director}</td>`;
      }

      if (category === "species") {
        table += `<td>${item.language}</td>`;
      }

      if (category === "vehicles" || category === "starships") {
        table += `<td>${item.passengers}</td>`;
      }
      table += `<td>${item.date}</td>`;
      table += `<td><button class="trashBtn"><ion-icon name="trash-outline"></ion-icon></button>
       <button class="aaa"><ion-icon name="information-circle-outline"></ion-icon></button></td>`;
    });
  document.querySelector(".table").innerHTML = table;

  addDeleteBtnFunctionality();
  allResults = [];
  document.querySelector(".overlay").classList.remove("active");
}

const prevBtn = document.querySelector(".prevBtn");
prevBtn.addEventListener("click", () => {
  if (curPage > 1) {
    curPage--;
    renderTable(curPage);
  }
});

const nextBtn = document.querySelector(".nextBtn");
nextBtn.addEventListener("click", () => {
  if (curPage * pageSize < tableData.length) {
    curPage++;
    buildTable(curPage);
    console.log(curPage);
  }
});
function numPages() {
  return Math.ceil(tableData.length / pageSize);
}

const addDeleteBtnFunctionality = () => {
  let popup = document.querySelector(".popup");
  const trashBtns = document.getElementsByClassName("trashBtn");
  let rowToBeDeleted;
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
};

// const selectPageSize = document.querySelector("#select-page-size");
// pageSize.addEventListener("change", (event) => {
//   console.log("change size", event.target.value);
// });
// const selectPageNumber = document.querySelector("#select-page-number");
// pageNumber.addEventListener("change", (event) => {
//   console.log("change number", event.target.value);
// });
//   select.addEventListener("change", function changePageSize(event) {
//     let pageSize = event.target.value;
//     if (pageSize === 5) {
//     }
//   });
// };

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
