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
let filteredTableData;
let searchValue;

const dataTableTemplate = document.querySelector("data-table-template");

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
  // document.querySelector(".pagination").style.display = "flex";
  // document.querySelector(".search-wrapper").style.display = "flex";

  search = document.querySelector("#search");
  search.addEventListener("input", searchInput);
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

  allResults = [];
  document.querySelector(".overlay").classList.remove("active");
}
function buildTableHead() {
  table = "";
  table += `<th>ID</th>
  <th>URL</th>`;
  if (category === "films") {
    table += `<th>Title></th>`;
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

  table += `<th>Created"</th>`;
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
      table += `<td>${item.opening_crawl.substring(0, 100)}...</td>`;
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
    table += `<td><input type="checkbox" class="checkbox"/><button class="trashBtn"><ion-icon name="trash-outline"></ion-icon></button>
       <button class="aaa"><ion-icon name="information-circle-outline"></ion-icon></button></td>`;
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
