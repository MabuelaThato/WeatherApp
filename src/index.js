function test(response) {
  let location = document.querySelector(".location");
  let dscrp1 = document.querySelector(".dscrp1");
  let icon1 = document.querySelector("#icon1");
  let iconUrl1 = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`;
  let iconUrl2 = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[1].condition.icon}.png`;
  let iconUrl3 = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[2].condition.icon}.png`;
  let iconUrl4 = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[3].condition.icon}.png`;
  let iconUrl5 = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[4].condition.icon}.png`;
  let iconUrl6 = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[5].condition.icon}.png`;
  let time1 = document.querySelector(".time1");
  let date = document.querySelector(".date");
  let temp1 = document.querySelector(".temp1");
  let temp2 = document.querySelector(".temp2");
  let temp3 = document.querySelector(".temp3");
  let temp4 = document.querySelector(".temp4");
  let temp5 = document.querySelector(".temp5");
  let temp6 = document.querySelector(".temp6");
  let icon2 = document.querySelector("#icon2");
  let icon3 = document.querySelector("#icon3");
  let icon4 = document.querySelector("#icon4");
  let icon5 = document.querySelector("#icon5");
  let icon6 = document.querySelector("#icon6");
  let day1 = document.querySelector(".day1");
  let day2 = document.querySelector(".day2");
  let day3 = document.querySelector(".day3");
  let day4 = document.querySelector(".day4");
  let day5 = document.querySelector(".day5");

  let getDay1 = new Date(response.data.daily[0].time * 1000);
  let getDay2 = new Date(response.data.daily[1].time * 1000);
  let getDay3 = new Date(response.data.daily[2].time * 1000);
  let getDay4 = new Date(response.data.daily[3].time * 1000);
  let getDay5 = new Date(response.data.daily[4].time * 1000);
  let getDay6 = new Date(response.data.daily[5].time * 1000);

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
  location.innerHTML = response.data.city;
  time1.innerHTML = `${today.getHours()}:${today.getMinutes()}, `;
  date.innerHTML = `${days[getDay1.getDay()]} ${today.getDate()} ${
    months[today.getMonth()]
  }`;
  dscrp1.innerHTML = `${response.data.daily[0].condition.description}, wind speed: ${response.data.daily[0].wind.speed} km/hr`;
  day1.innerHTML = days[getDay2.getDay()];
  day2.innerHTML = days[getDay3.getDay()];
  day3.innerHTML = days[getDay4.getDay()];
  day4.innerHTML = days[getDay5.getDay()];
  day5.innerHTML = days[getDay6.getDay()];
  temp1.innerHTML = `${Math.round(response.data.daily[0].temperature.day)} °C`;
  temp2.innerHTML = `${Math.round(
    response.data.daily[1].temperature.maximum
  )}° /
    ${Math.round(response.data.daily[1].temperature.minimum)}°`;
  temp3.innerHTML = `${Math.round(
    response.data.daily[2].temperature.maximum
  )}° /
    ${Math.round(response.data.daily[2].temperature.minimum)}°`;
  temp4.innerHTML = `${Math.round(
    response.data.daily[3].temperature.maximum
  )}° /
    ${Math.round(response.data.daily[3].temperature.minimum)}°`;
  temp5.innerHTML = `${Math.round(
    response.data.daily[4].temperature.maximum
  )}° /
    ${Math.round(response.data.daily[4].temperature.minimum)}°`;
  temp6.innerHTML = `${Math.round(
    response.data.daily[5].temperature.maximum
  )}° /
    ${Math.round(response.data.daily[5].temperature.minimum)}°`;

  icon1.setAttribute("src", iconUrl1);
  icon1.setAttribute("alt", response.data.daily[0].condition.description);
  icon2.setAttribute("src", iconUrl2);
  icon2.setAttribute("alt", response.data.daily[1].condition.description);
  icon3.setAttribute("src", iconUrl3);
  icon3.setAttribute("alt", response.data.daily[2].condition.description);
  icon4.setAttribute("src", iconUrl4);
  icon4.setAttribute("alt", response.data.daily[3].condition.description);
  icon5.setAttribute("src", iconUrl5);
  icon5.setAttribute("alt", response.data.daily[4].condition.description);
  icon6.setAttribute("src", iconUrl6);
  icon6.setAttribute("alt", response.data.daily[5].condition.description);
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

navigator.geolocation.getCurrentPosition(handlePosition);
