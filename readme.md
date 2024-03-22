Deployed link:https://manasvi-weather-app.netlify.app/

I myself have built this project using HTML CSS & JavaScript. I’ve used OpenWeatherMap API to get the weather details of the user entered city or user’s current location.
I already told you I used vanilla JavaScript to create this weather app. In the JavaScript file, I got the user entered city name and press the enterb key and sent a get request to an OpenWeatherMap API with passing the city name. If the user clicked on the “Get Device Location” button then first I checked the user browser supports geolocation API or not.

If it’s supported, I got the current latitude and longitude of the device and sent these coordinates to the OpenWeatherMap API. After I got an object as a response from the API then I displayed the property value to a particular HTML element. At last, using the id value that API provides us, I showed the custom weather icon/image according to the weather condition.
