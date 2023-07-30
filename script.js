// query selection
var parants = document.querySelector(".main_body");
const submitbtn = document.querySelector(".submit");
const inputvalue = document.querySelector(".input_value");
var child = document.querySelector(".info");
var sibiling = document.querySelector(".foot");
let data;
let data1;
let persmission;
//search contry info
const rendercontryError = function (msg) {
  child.style.opacity = 0;
  sibiling.style.opacity = 0;
  alert(`${msg}`);
};
const renderError = function (err) {
  sibiling.style.opacity = 0;
};
const renderneighbour = function (data1) {
  let { common: Name1 } = data1.name;
  let { svg: flag1 } = data1.flags;

  const html1 = ` <div class="foot">
  <div class="foot1">
    <p>Neighbour Country</p>
    <span>__[${Name1}]</span>
  </div>
  <div class="foot2"><img src="${flag1}" alt="" /></div>
</div>`;
  parants.insertAdjacentHTML("beforeend", html1);
  parants.removeChild(sibiling);
  const sibiling_next = document.querySelector(".foot");
  sibiling_next.style.opacity = 1;
  sibiling = sibiling_next;
};

const rendercountry = function (data) {
  let { svg: flag } = data.flags;
  let { common: Name } = data.name;
  let { capital: city } = data;
  let { population: people } = data;
  let { currencies } = data;
  let crr = currencies[Object.keys(currencies)[0]].name;
  let { languages } = data;
  let lng = languages[Object.keys(languages)[0]];
  //neigobur country info

  ////////////////////////////HTML file inserting..
  const html = ` <div class="info">
    <div class="flags">
      <div class="flag">
        <img src="${flag}" alt="" />
      </div>
      <div class="flag_name"><h1>${Name}</h1></div>
    </div>
    <div class="flag_info">
      <div class="h2">
      <h2 class="region">®️Region:${data.region}</h2>
      <h2 class="capital">🌆Captial City: ${city}</h2>
      <h2 class="population">👯Population: ${(+people / 1000000).toFixed(
        1
      )} M</h2>
      <h2 class="currency">💹Currency : ${crr}</h2>
      <h2 class="language">🗣️Language: ${lng}</h2>
      </div>
    </div>
  </div>
  `;
  parants.insertAdjacentHTML("beforeend", html);
  parants.removeChild(child);
  const child_next = document.querySelector(".info");
  child_next.style.transition = "1s";
  child_next.style.opacity = 1;
  child = child_next;
};

submitbtn.addEventListener("click", function () {
  persmission = true;
  let value = inputvalue.value;
  fetch(`https://restcountries.com/v3.1/name/${value}`)
    .then((response) => {
      if (!response.ok) {
        persmission = response.ok;
        throw new rendercontryError(`Country Not Found ! ${response.status}`);
      }
      return response.json();
    })
    .then((Data) => {
      data = Data[0];
      rendercountry(data);
      return fetch(`https://restcountries.com/v3.1/alpha/${data.borders[0]}`);
    })
    .catch((err) => {
      renderError(err);
    })
    .then((response) => response.json())
    .then((datas) => {
      data1 = datas[0];
      renderneighbour(data1);
    })
    .catch((err) => {
      if (persmission === false) return;
      alert(`Neighbour Not Found`);
    });
  inputvalue.value = "";
});
