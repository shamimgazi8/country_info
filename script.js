// query selection
var parants = document.querySelector(".main_body");
const submitbtn = document.querySelector(".submit");
const inputvalue = document.querySelector(".input_value");
var child = document.querySelector(".info");

submitbtn.addEventListener("click", function () {
  let value = inputvalue.value;
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${value}`);

  request.send();
  inputvalue.value = "";

  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);
    ////////////////////////////

    let { svg: flag } = data.flags;
    let { common: Name } = data.name;
    let { capital: city } = data;
    let { population: people } = data;
    let { currencies } = data;
    let crr = currencies[Object.keys(currencies)[0]].name;
    let { languages } = data;
    let lng = languages[Object.keys(languages)[0]];
    ////////////////////////////
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
<style>
.info{
  transition: 0.6s;
}
</style>`;
    parants.insertAdjacentHTML("beforeend", html);
    parants.removeChild(child);
    const child_next = document.querySelector(".info");
    child_next.style.transition = "1s";
    child_next.style.opacity = 1;
    child = child_next;
  });
});
