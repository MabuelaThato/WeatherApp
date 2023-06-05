function test(response) {
  console.log(response.data);
  let dscrp1 = document.querySelector(".dscrp1");
  let icon1 = document.querySelector("#icon1");
  let iconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`;
  let time1 = document.querySelector(".time1");
  let date = document.querySelector(".date");
  let temp1 = document.querySelector(".temp1");
  let input = document.querySelector(".form-control");
  const today = new Date();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  time1.innerHTML = `${today.getHours()}:${today.getMinutes()}, `;
  let location = document.querySelector(".location");
  location.innerHTML = response.data.city;
  date.innerHTML = `${days[today.getDay()]} ${today.getDate()} ${
    months[today.getMonth()]
  }`;
  dscrp1.innerHTML = `${response.data.daily[0].condition.description}, wind speed: ${response.data.daily[0].wind.speed} km/hr`;
  temp1.innerHTML = Math.round(response.data.daily[0].temperature.day);
  icon1.setAttribute("src", iconUrl);
  icon1.setAttribute("alt", response.data.daily[0].condition.description);
  celcius = response.data.daily[0].temperature.day;
}

function searchCity(city) {
  let sheKey = "9oa4e130b348d430501cf5a6aeaaa6ft";
  let sheUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${sheKey}&units=metric`;
  axios.get(sheUrl).then(test);
}

function getSubmit(event) {
  event.preventDefault();
  let input = document.querySelector(".form-control");
  searchCity(input.value);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let myKey = "9oa4e130b348d430501cf5a6aeaaa6ft";
  let geoUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${myKey}&units=metric`;

  axios.get(geoUrl).then(test);

  let form = document.querySelector("#search");
  form.addEventListener("submit", getSubmit);
}
function showFahrenheit(event) {
  event.preventDefault();
  let fah = document.querySelector(".temp1");
  fah.innerHTML = Math.round(celcius * 1.8 + 32);
}
function showCelcius(event) {
  event.preventDefault();
  let cel = document.querySelector(".temp1");
  cel.innerHTML = Math.round(celcius);
}

let celcius = null;
let metric = document.querySelector(".metric");
let imperial = document.querySelector(".imperial");
imperial.addEventListener("click", showFahrenheit);
metric.addEventListener("click", showCelcius);

navigator.geolocation.getCurrentPosition(handlePosition);
