 let weather = {
  apiKey: "1e180c803a4998322ba3929358e28585",
  fetchWeather: function (city) {

    // Hava durumu API'sine istek yap
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {

        // Yanıt başarısız ise hata göster
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }

        // Yanıtı JSON formatında döndür
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {

    // Hava durumu verilerini göster
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

    // Arka plan resmini değiştir
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {

    // Arama çubuğuna girilen şehir ismine göre hava durumunu getir
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// Arama butonuna tıklandığında arama yap
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Arama çubuğuna enter tuşuna basıldığında arama yap
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// Başlangıçta Denver şehrinin hava durumunu göster
weather.fetchWeather("Denver");
