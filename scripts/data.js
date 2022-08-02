const form = document.querySelector(".change-location");
const card = document.querySelector(".card");
const cityEl = document.querySelector(".details h5");
const temp = document.querySelector(".details span");
const weatherCondition = document.querySelector(".details div");
const icon = document.querySelector(".card img");

const key = "ee1e32d897ff1e5b883fb3b65cbc16f4";
let cityname;

const updateUI = (data) => {
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  weatherIcon = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  console.log(data);
  weatherCondition.textContent = data.weather[0].main;
  cityEl.textContent = cityname;
  temp.textContent = data.main.temp;
  icon.setAttribute("src", `${iconUrl}`);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  cityname = form.city.value.trim();

  // set local storage
  localStorage.setItem("city", cityname);

  if (cityname) {
    getWeather(cityname).then((data) => {
      updateUI(data);
    });
  }
  form.reset();
});

const getWeather = async (city = "Nicosia") => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

// get local storage
cityname = localStorage.getItem("city");

console.log(cityname);

if (cityname) {
  getWeather(cityname).then((data) => {
    updateUI(data);
  });
}
