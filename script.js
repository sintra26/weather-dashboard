const apiKey = "41d12668e3f1c072320749cbad8a081c"; // 🔑 Get from https://openweathermap.org/api

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city!</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log(data);

    if (data.cod !== 200) {
      resultDiv.innerHTML = `<p>❌ City not found</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 ${data.main.temp}°C</p>
      <p>☁️ ${data.weather[0].description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>⚠️ Error fetching weather data</p>";
  }
}