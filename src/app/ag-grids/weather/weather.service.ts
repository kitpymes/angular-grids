import { HttpFetchService } from '../../services/http.fetch.service';
import { Subject } from 'rxjs';

export class WeatherService {
  apiKey = 'e8ce257925db71ce84b271f815adc268';

  constructor(public http: HttpFetchService) {
  }

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${this.apiKey}`;
    const dataSub = new Subject<string>();
    this.http.getJson(url).then((data) => {
        dataSub.next(data['weather']);
      }, (err) => {
        console.log(err);
      });

    return dataSub;
  }

  getCitiesWeathersByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${cities}&units=${metric}&APPID=${this.apiKey}`;
    const citiesSubject = new Subject();
    cities.forEach((city) => {
      citiesSubject.next(this.http.getJson(url));
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}`;
    const dataSubject = new Subject<string>();
    this.http.getJson(url).then((data) => {
        dataSubject.next(data['weather'][0].main);
      });
    return dataSubject;
  }

  getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${this.apiKey}`;
    const dataSubject = new Subject<number>();
    this.http.getJson(url).then((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }


  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${this.apiKey}`;
    const dataSubject = new Subject<number>();
    this.http.getJson(url).then((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }


  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${this.apiKey}`;
    const dataSubject = new Subject<number>();
    this.http.getJson(url).then((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
    return dataSubject;
  }


  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=${this.apiKey}`;
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.getJson(url).then((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=${this.apiKey}`;
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.getJson(url).then((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (min > value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=${this.apiKey}`;
    const dataSubject = new Subject<Array<any>>();
    this.http.getJson(url).then((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }

}
