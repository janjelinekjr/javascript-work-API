const weatherContainer = document.querySelector(".weather-card");
const btn = document.querySelector(".btn");
const updatedPara = document.querySelector(".updated");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update time
let min = 0;
let interval;

const updateMin = function () {
  const formatter = new Intl.RelativeTimeFormat("en");
  min++;
  const formatted = formatter.format(`-${min}`, "minutes");
  updatedPara.textContent = `Updated ${formatted}`;
};

const startInterval = () => {
  interval = setInterval(updateMin, 60000);
};

const stopInterval = () => {
  clearInterval(interval);
  min = 0;
  updatedPara.textContent = "Updated";
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get data
const showWeather = async function () {
  // Fetch data
  try {
    startInterval();
    const source = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Praha?unitGroup=metric&key=TH5KKE68ZQC92RM6GYZ8UG8PG&contentType=json`
    );

    const data = await source.json();
    console.log(source);
    console.log(data);

    if (!source.ok) {
      throw new Error(`Error status:${source.status}`);
    }

    // Clear container
    weatherContainer.innerHTML = "";

    // Render
    const renderedData = `
      <div class="location">
          <h1>${data.address}</h1>
          <p>${data.resolvedAddress}</p>
        </div>
        <h4 class="description">
          ${data.description}
        </h4>
        <div class="data">
          <p>Temperature: ${data.currentConditions.temp}℃</p>
          <p>Feels like: ${data.currentConditions.feelslike}℃</p>
          <p>Humidity: ${data.currentConditions.humidity}%</p>
          <p>Pressure: ${data.currentConditions.pressure}hPa</p>
          <p>UV Index: ${data.currentConditions.uvindex}</p>
        </div>
      `;

    weatherContainer.insertAdjacentHTML("afterbegin", renderedData);
  } catch (err) {
    alert(err);
  }
};

showWeather();

setInterval(() => {
  stopInterval();
  showWeather();
}, 300000);

btn.addEventListener("click", (event) => {
  stopInterval();
  showWeather();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
