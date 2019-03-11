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
   *  I am not sure I fully groked the detail screen. I thought the point of the exercise here was to reshape the data into daily data. But then overcast state and graphing exercise seem to become trivialized. Hopefully my level of understanding here was still clearly demonstrated I did my best with the interpretation.
   *  Session management on logout would require a db. For the sake of ease one was not used. In a real setting the auth service would hit a backend and data about preferences would be stored there. Local storage is unique to the browser user and os user so it seemed that the requirement due to scope and time constraints was logically satisfied except for the storing of user data permanently to localStorage. This could have been achieved by storing data in a user array and then storing preferences in there. However, that could be viewed as an anti-pattern in as users could inspect see other users data.
* Things I would've liked to do
  * Create a service for manipulating localStorage and user preferences (repeated code)
  * Make a directive for formatting temp based on unit (repeated code
