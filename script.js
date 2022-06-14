window.onload = addBtns;

import {
  Base,
  People,
  Planets,
  Films,
  Species,
  Vehicles,
  Starships,
} from "./classes.js";

const BASE_URL = "https://swapi.dev/api/";
let currentCategoryData;
let tableData;
let table;
let category;
let allResults = [];
let pageSize = 10;
let curPage = 1;
let numOfPages;
let search;
let searchValue;
let detailsToShow;

async function fetchAPI(category) {
  let url = `${BASE_URL}${category}`;
  while (url) {
    const response = await fetch(url);
    currentCategoryData = await response.json();
    allResults.push(...currentCategoryData.results);
    url = currentCategoryData.next;
  }
  return allResults;
}

async function addBtns() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const buttons = document.querySelector(".dynamic-btns");

  Object.entries(data).map(([key]) => {
    const btn = document.createElement("button");
    btn.innerHTML = key.toUpperCase();
    btn.addEventListener("click", btnOnclick);
    buttons.appendChild(btn);
  });
}

async function btnOnclick(event) {
  category = event.target.innerHTML.toLowerCase();
  document.querySelector(".overlay").classList.add("active");

  await fetchAPI(category);

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
      ({ url, name, created, id, director, title, opening_crawl, producer }) =>
        new Films(
          url,
          name,
          created,
          id,
          director,
          title,
          opening_crawl,
          producer
        )
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
      ({ url, name, created, id, model, passengers, max_atmosphering_speed }) =>
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
      ({ url, name, created, id, model, passengers, max_atmosphering_speed }) =>
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

  renderTable();
}

function renderTable(page = 1) {
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
  buildTableHead();
  buildTableBody();
  document.querySelector(".pagination").style.display = "flex";
  document.querySelector(".search-wrapper").style.display = "flex";
  document.querySelector(".table").innerHTML = table;

  addDeleteBtnFunctionality();
  addDetailsBtnFunctionality();
  search = document.querySelector("#search");
  search.addEventListener("input", searchInput);

  allResults = [];
  document.querySelector(".overlay").classList.remove("active");
}
function buildTableHead() {
  table = "";
  table += `<th>ID</th>`;

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
  if (category === "people") {
    table += `<th>Gender</th>`;
  }
  if (category === "planets") {
    table += `<th>Terrain</th>`;
  }
  if (category === "films") {
    table += `<th>Producer</th>`;
  }
  if (category === "species") {
    table += `<th>Classification</th>`;
  }
  if (category === "vehicles" || category === "starships") {
    table += `<th>Max atmosphering speed</th>`;
  }
  // table += `<th>URL</th>`;
  table += `<th>Created</th>`;
  table += `<th>Delete/Details</th>`;
}
function buildTableBody() {
  const tableDataAftersearch = searchValue
    ? tableData.filter((item) => item.name.toLowerCase().includes(searchValue))
    : tableData;
  let filtered = tableDataAftersearch.filter((_, index) => {
    let start = (curPage - 1) * pageSize;
    let end = curPage * pageSize;
    if (index >= start && index < end) return true;
  });

  filtered.forEach((item) => {
    table += "<tr>";
    table += `<td>${item.id}</td>`;
    table += `<td>${item.name}</td>`;

    if (category === "people") {
      table += `<td>${item.birth_year}</td>`;
    }

    if (category === "planets") {
      table += `<td>${item.population}</td>`;
    }

    if (category === "films") {
      table += `<td>${item.opening_crawl.substring(0, 50)}...</td>`;
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
    if (category === "people") {
      table += `<td>${item.gender}</td>`;
    }
    if (category === "planets") {
      table += `<td>${item.terrain}</td>`;
    }
    if (category === "films") {
      table += `<td>${item.producer}</td>`;
    }
    if (category === "species") {
      table += `<td>${item.classification}</td>`;
    }
    if (category === "vehicles" || category === "starships") {
      table += `<td>${item.max_atmosphering_speed}</td>`;
    }

    // table += `<td>${item.url}</td>`;
    table += `<td>${item.date}</td>`;
    table += `<td><div class="delete-details-container"><input type="checkbox" class="checkbox"/><button class="trashBtn"><ion-icon name="trash-outline"></ion-icon></button>
       <button class="details"><ion-icon name="information-circle-outline"></ion-icon></button></div></td>`;
  });
}

function searchInput(event) {
  searchValue = event.target.value.toLowerCase();
  curPage = 1;
  renderTable();
}

const prevBtn = document.querySelector(".prevBtn");
prevBtn.addEventListener(
  "click",
  () => {
    if (curPage > 1) {
      curPage--;
      renderTable(curPage);
    }
  },
  false
);

const nextBtn = document.querySelector(".nextBtn");
nextBtn.addEventListener(
  "click",
  () => {
    if (curPage * pageSize < tableData.length) {
      curPage++;
      renderTable(curPage);
    }
  },
  false
);
function numPages() {
  numOfPages = Math.ceil(tableData.length / pageSize);
  return numOfPages;
}

const typePageNumber = document.querySelector("#type-page-number");
typePageNumber.addEventListener(
  "input",
  (event) => {
    curPage = event.target.value;
    if (curPage > 0 && curPage <= numOfPages) {
      renderTable(curPage);
    }
  },
  false
);

const selectPageSize = document.querySelector("#select-page-size");
selectPageSize.addEventListener("change", (event) => {
  if (selectPageSize.value === "5") {
    pageSize = 5;
    renderTable();
  }
  if (selectPageSize.value === "10") {
    pageSize = 10;
    renderTable();
  }
  if (selectPageSize.value === "20") {
    pageSize = 20;
    renderTable();
  }
});

const addDeleteBtnFunctionality = () => {
  let checkboxChecked;
  let rowToBeDeleted;
  let filteredCheckbox;

  let popup = document.querySelector(".popup");
  const trashBtns = document.getElementsByClassName("trashBtn");

  const showDeletePopup = (event) => {
    checkboxChecked = document.querySelectorAll(".checkbox");
    filteredCheckbox = Array.from(checkboxChecked).filter(
      (input) => input.checked
    );
    rowToBeDeleted = event.target;

    popup.style.display = "block";
  };
  [...trashBtns].forEach((event) => (event.onclick = showDeletePopup));

  const handleDelete = document
    .querySelector(".delete")
    .addEventListener("click", () => {
      if (filteredCheckbox != null) {
        filteredCheckbox.forEach((item) => item.closest("tr").remove());
      }
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
const addDetailsBtnFunctionality = () => {
  let rowToShowDetails;

  const detailsBtns = document.getElementsByClassName("details");

  const showDetails = (event) => {
    rowToShowDetails = event.target;
    // console.log({ rowToShowDetails });
    let th = document.querySelectorAll("th");
    let thArr = Array.from(th);
    let thInnerText = thArr.map((th) => {
      return th.innerText;
    });
    // console.log({test3});

    let findTrToShowDetails = rowToShowDetails.closest("tr");
    let trInnerText = Array.from(findTrToShowDetails.innerText)
      .join("")
      .split("\t");
    // console.log({ test2 });

    document.querySelector("table").classList.add("small-table");
    document.querySelector(".details-popup").style.display = "flex";

    let combineThAndTr = trInnerText.reduce(
      (result, field, index) => {
        result[columns[index]] = field;
        return result;
      },
      [{}]
    );
    console.log({ combineThAndTr });
    detailsToShow = "";
    // combineThAndTr.forEach((item) => {
    //   detailsToShow += `<span>${item}</span>`;
    // });

    // let rowToShowDetailsID=Array.from(test1.innerText)
    // detailsToShow += `<span>${test1.innerHTML[4]}</span>`;
    // console.log({rowToShowDetailsID})

    document.querySelector(".details-popup").innerHTML = detailsToShow;
  };
  [...detailsBtns].forEach((event) => (event.onclick = showDetails));

  const handleCloseDetails = document
    .querySelector(".close-details")
    .addEventListener("click", function () {
      document.querySelector("table").classList.remove("small-table");
      document.querySelector(".details-popup").style.display = "none";
    });
};
