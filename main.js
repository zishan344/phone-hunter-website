// globle variable
const notFound = document.getElementById("not-found");
const displayLoadapi = () => {
  fetch("https://openapi.programming-hero.com/api/phones")
    .then((response) => response.json())
    .then((result) => displayData(result.data));
};
displayLoadapi();

// load search value
const loadApi = () => {
  // console.log("Loading search results");
  const searchBox = document.getElementById("loadApiData");
  const searchTextvalue = searchBox.value;
  // console.log(searchText.value);
  if (searchBox.value == "") {
    notFound.style.display = "block";
    const searchBody = document.getElementById("search-result");
    searchBody.innerHTML = "";
  } else {
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`
    )
      .then((response) => response.json())
      .then((result) => displayData(result.data));
  }

  searchBox.value = "";
};
const displayData = (data) => {
  // console.log(data);
  if (data.length == 0) {
    notFound.style.display = "block";
  } else {
    notFound.style.display = "none";
  }
  const searchBody = document.getElementById("search-result");
  searchBody.innerHTML = "";
  const slicing = data.slice(0, 20);
  slicing.forEach((element) => {
    // console.log(element);
    const div = document.createElement("div");
    div.classList.add("col-sm-12");
    div.classList.add("col-md-6");
    div.classList.add("col-lg-4");
    div.classList.add("my-3");
    div.innerHTML = `
    <div class="shadow-lg rounded px-4 py-3">
    <img class="img-fluid" src="${element.image}">
    <h5>${element.phone_name}</h5>
    <h6>brand: ${element.brand}</h6>
    <div class="text-end">
    <button onclick="loadFullDetails('${element.slug}')" class="btn btn-primary">More Detils</button>
    </div>
    </div>
    `;

    searchBody.appendChild(div);
  });
};

const loadFullDetails = (data) => {
  // console.log(data);
  const url = `https://openapi.programming-hero.com/api/phone/${data}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayFullDetils(result.data));
};
const displayFullDetils = (data) => {
  console.log(data);
  const fullDetils = document.getElementById("product-detils");
  fullDetils.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("col-md-12");
  div.classList.add("col-sm-12");
  div.classList.add("shadow-lg");
  div.classList.add("rounded");
  div.classList.add("px-4");
  div.classList.add("py-3");
  div.innerHTML = `
  <div class="row justify-content-lg-around">
  <div class="col-sm-4 col-md-3">
  <img class="img-fluid" src="${data.image}">
  <h5>${data.name}</h5>
  <h6>brand: ${data.brand}</h6>
  <p> <b> release Date </b> <br>
   ${data.releaseDate ? data.releaseDate : "Data is not found"}</p>
  </div>

  <div class="col-sm-4 col-md-3">
  <h4>Main Features<h4>
  <h6><b>chipSet:</b>    ${data.mainFeatures.chipSet}<h6>
  <h6><b>displaySize:</b>${data.mainFeatures.displaySize}<h6>
  <h6><b>memory:</b>    ${data.mainFeatures.memory}<h6>
  <h3>sensors :</h3> 
  <h6 class=" ">${data.mainFeatures.sensors.map((x) => x + " ")}</h6>
 
  </div>

  <div class="col-sm-4 col-md-3">
  <h4>Others Features<h4>
  <h6><b>Bluetooth:</b>${data.others.Bluetooth}<h6>                    
  <h6><b>GPS:</b>     ${data.others.GPS}<h6>
  <h6><b>NFC:</b>     ${data.others.NFC}<h6>
  <h6><b>Radio:</b>   ${data.others.Radio}<h6>
  <h6><b>USB:</b>     ${data.others.USB}<h6>
  <h6><b>WLAN:</b>    ${data.others.WLAN}<h6>
   
  </div>

  </div>
  `;
  fullDetils.appendChild(div);
};
