export default function fetchWeather() {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=paris&appid=28c74e0a254572c6c9dcab44bb2ab502`
  
    return fetch(url).then((response) => response.json())
  }