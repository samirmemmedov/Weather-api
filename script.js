let weather = {
  apiKey: "1e180c803a4998322ba3929358e28585",
  fetchWeather: function (city) {
    // Make a request to the Weather API
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        // Show error message if the response is not successful
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        // Return response in JSON format
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    // Display weather data
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");

    // Change the background image
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    // Search weather based on city name entered in the search bar
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// Perform search on click of the search button
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Perform search on pressing enter key in the search bar
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// Display weather for Denver city by default
weather.fetchWeather("Baku");
