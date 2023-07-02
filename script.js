const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  wIcon = document.querySelector(".weather-part img");
arrowBack = wrapper.querySelector("header i");
let api;
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your Browser does not support geolocation api");
  }
});

const apiKey = "77d6e5e8ffd7b7807c6e15385b0fbc05";
function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}
function weatherDetails(info) {
  infoTxt.classList.replace("pending", "error");
  if (info.cod == "404") {
    infoTxt.innerText = `${inputField.value} isn't a valid city name.`;
  } else {
    infoTxt.classList.remove("pending", "error");
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;
    if (id == 800) {
      wIcon.src = "Weather Icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "Weather Icons/snow.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "Weather Icons/storm.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "Weather Icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "Weather Icons/cloud.svg";
    } else if (id >= 300 && id <= 321) {
      wIcon.src = "Weather Icons/rain.svg";
    }

    wrapper.querySelector(".temp .numb").innerText = temp;
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

    wrapper.classList.replace("hidden", "active");

    console.log(info);
  }
}
function fetchData() {
  infoTxt.innerHTML = "Getting Weather Details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}
arrowBack.addEventListener("click", () => {
  wrapper.classList.replace("active", "hidden");
});
