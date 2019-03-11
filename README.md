# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Basics

* Repo can be found [here](https://github.com/mikedklein/OpenWeather-Angular).
* App is deployed [here](https://romantic-goldstine-452832.netlify.com)

## Notes

*  Issues with some requirements
   *  Overcast state on Five Day forecast is actually more complicated due the shape of the data. Data comes back in 3 hour intervals so some aggregate method of determining overall Overcast state would need to be employed. For now it will just be defaulted to the first reported for that day.
   *  I am not sure I fully groked the detail screen. I thought the point of the exercise here was to reshape the data into daily data. I made this assumption due to the fact that as data came in it seemed high low temps became the same as the temp number in list data returned. But then overcast state and graphing exercise seem to become trivialized. Hopefully my level of understanding here  still clearly demonstrated my skillset.
   *  Session management on logout would require a db. For the sake of ease session management was done by using a user key (their email) in localStorage. This is not a production grade practice and ideally would be handled in a db. As localstorage is unique to OS user or browser user (if said browser has login capabilities) this implementation is just for demonstration purposes and does indicate how I would solve this problem in a production environment.
* Things I would've liked to do:
  * Make a directive for formatting temp based on unit (repeated code)
  * Be a bit more organized with my components
  * Write unit tests I unfortunately did not have time for unit testing as it has beena while since I have written Angular tests I thought it might prove to get in the way of the requirements.
  * Typing suffered a bit in the graph as time wore down would like to refactor that to optimal typescript standards.
  * Small bug with the toggle where on first toggle state of the toggle doesn't change. The app functins the same it is just weird UI bug that I would like to track down
