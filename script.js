import got from "./data.js";

const { houses } = got;

// house list
let allHouses = houses.reduce((acc, { name }) => {
  acc.push(name);
  return acc;
}, []);


function loadGotPage(action) {
  let houseMember;
  if (action.type !== "member") {
    houseMember = member("", action.data);
  }
  if (action.buttonContainer) {
    let filterContainer = document.createElement("div");
    let filterContainerMain = document.querySelector(".filter-container-main");
    for (let i = 0; i < allHouses.length; i++) {
      filterContainer.setAttribute("class", "filter-container");
      let filterBtn = document.createElement("button");
      filterBtn.setAttribute("class", `filter-tags`);
      filterBtn.setAttribute("type", "button");
      filterBtn.innerText = allHouses[i];
      filterContainer.append(filterBtn);
    }
    filterContainerMain.append(filterContainer);
  }
  let peopleChartMain = document.querySelector(".people-chart-main");
  let peopleChart = document.createElement("div");
  peopleChart.setAttribute("class", "people-chart");

  if (action.type === "dashboard") {
    peopleChartMain.innerHTML = "";
    peopleChart.innerHTML = "";
    for (let i = 0; i < houseMember.length; i++) {
      const { name, description, image } = houseMember[i];
      let personContainer = document.createElement("div");
      personContainer.setAttribute("class", "person-container");
      personContainer.innerHTML = `
         <div class="person-img-container">
                        <img src="${image}" alt="${name}-img" class="person-img">
                    </div>
                    <span class="person-name">${name}</span>
                    <span class="person-description">${description}</span>
                    <button type="button">KNOW MORE</button>
        `;

      peopleChart.append(personContainer);
    }
    peopleChartMain.append(peopleChart);
  } else if (action.type === "house") {
    peopleChartMain.innerHTML = "";
    peopleChart.innerHTML = "";

    for (let i = 0; i < houseMember.length; i++) {
      const { name, description, image } = houseMember[i];
      let personContainer = document.createElement("div");
      personContainer.setAttribute("class", "person-container");
      personContainer.innerHTML = `
         <div class="person-img-container">
                        <img src="${image}" alt="${name}-img" class="person-img">
                    </div>
                    <span class="person-name">${name}</span>
                    <span class="person-description">${description}</span>
                    <button type="button">KNOW MORE</button>
        `;

      peopleChart.append(personContainer);
    }
    peopleChartMain.append(peopleChart);
  } else if (action.type === "member") {
    peopleChartMain.innerHTML = "";
    peopleChart.innerHTML = "";
    houseMember = action.data;

    for (let i = 0; i < houseMember.length; i++) {
      const { name, description, image } = houseMember[i];
      let personContainer = document.createElement("div");
      personContainer.setAttribute("class", "person-container");
      personContainer.innerHTML = `
         <div class="person-img-container">
                        <img src="${image}" alt="${name}-img" class="person-img">
                    </div>
                    <span class="person-name">${name}</span>
                    <span class="person-description">${description}</span>
                    <button type="button">KNOW MORE</button>
        `;

      peopleChart.append(personContainer);
    }
    peopleChartMain.append(peopleChart);
  }
}

loadGotPage({ type: "dashboard", data: houses, buttonContainer: true }); //main call

let filterContainer = document.querySelector(".filter-container");
if (filterContainer) {
  filterContainer.addEventListener("click", (event) => {
    loadGotPage({
      type: "house",
      data: houseMembers(event.target.innerText),
      buttonContainer: false,
    });
  });
}

// particular house tag
function houseMembers(house) {
  return houses.filter((x) => x.name === house);
}

// search tag
document
  .querySelector("#searching-people")
  .addEventListener("input", (event) => {
    let data = member(event.target.value, houses);
    loadGotPage({ type: "member", data, buttonContainer: false });
  });

function member(searchTerm, houseArray) {
  let regex = new RegExp(searchTerm, "gi");
  let result = houseArray.flatMap((house) => {
    return house.people.filter((person) => regex.test(person.name));
  });
  return result;
}

