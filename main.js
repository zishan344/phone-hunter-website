const loadSearchResult = () => {
  // console.log("Loading search results");
  const searchBox = document.getElementById("search-box");
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`
  )
    .then((response) => response.json())
    .then((data) => displayData(data.data));
  searchBox.value = "";
};
const displayData = (data) => {
  console.log(data);
  const searchBody = document.getElementById("search-body");
  data.forEach((element) => {
    console.log(element);
    const div = document.createElement("div");
    div.classList.add("col-sm-12");
    div.classList.add("col-md-6");
    div.classList.add("col-lg-4");
    div.classList.add("my-3");
    div.innerHTML = `
    <div class="card-content shadow-lg rounded px-4 py-3">
    <img src="${element.image}">
    <h5>${element.phone_name}</h5>
    <h6>${element.brand}</h6>
    <div class="text-end">
    <button class="btn btn-primary">More Detils</button>
    </div>
    </div>
    `;
    searchBody.appendChild(div);
  });
};
