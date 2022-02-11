const express = require('express')
const https = require('https');
const app = express();

app.get("/", function(req, res) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&APPID=${process.env.APPID}&units=metric`
  https.get(url, function(response) {
  console.log(response)

  response.on("data", function(data) {
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const desc = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imgURL = `http://openweather.org/img/wn${icon}@2x.png`

    res.write("<h1>The temperature in Toronto is " + temp + "degrees Celsius</h1>")
    res.write(`<h3>The weather is currently ${desc}</h3>`)
    res.write("<img src=" + imgURL +">")

    res.send()
  })
  })
})

app.listen(3000, function () {
  console.log('Server is running on port 3000')
})