function displayWeather(data) {
  const name = data.location.city
  const description = data.current_observation.condition.text
  const temp = data.current_observation.condition.temperature
  const humidity = data.current_observation.atmosphere.humidity
  const speed = data.current_observation.wind.speed
  document.querySelector(".city").innerText = "Weather in " + name
  document.querySelector(".description").innerText = description
  document.querySelector(".temp").innerText = temp + "°C"
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"
  document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h"
  document.querySelector(".weather").classList.remove("loading")
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
}

function getWeather(place) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1Ijoic2F0aGlzaGtvbGEiLCJhIjoiY2w5dG5hem90MGszNzN2azdoMWVrZHp0ZSJ9.sPOAAvFO5WiuVG-cqO5Rng&limit=1`, { method: 'GET' })
    .then(res => res.json())
    .then((res) => {
      const latitude = res.features[0].center[1]
      const longitude = res.features[0].center[0]
      const place = res.features[0].place_name
      return { latitude, longitude, place }
    })
    .then((res) => {
      const { latitude, longitude, place } = res
      const url = 'https://yahoo-weather5.p.rapidapi.com/weather?lat=' + latitude + '&long=' + longitude + '&u=c'
      return fetch(url, {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': 'd17566fa73mshf5d3fb2c366fe1ap1740dajsnf3e9bfabd902',
          'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
        }
      }).then(res => res.json())
    }).then((res) => {
      displayWeather(res)
    })
    .catch((error) => { console.log("Error fething data!", error) })
}
document.querySelector(".search button").addEventListener("click", function () {
  const place = document.querySelector(".search-bar").value
  getWeather(place)
})

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      const place = document.querySelector(".search-bar").value
      getWeather(place)
    }
  })

getWeather("mumbai")