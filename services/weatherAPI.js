import { GEONAMES_USERNAME as username } from '../env.js';
const baseGeoURL = `http://api.geonames.org/searchJSON?&type=JSON&username=${username}&maxRows=10`; // country=US
const baseForcastURL = 'https://api.open-meteo.com/v1/forecast';

/**
 *
 * @param {string} locationDesc describes location (e.g. 'Miami, Florida', or '32605', or 'Atlanta'.)
 * @returns a list of locations
 */
export async function geoSearch(locationDesc) {
  return fetch(`${baseGeoURL}&q=${locationDesc}`)
    .then((res) => res.json())
    .then((res) => res.geonames);
}

/* 
lat: "29.65163"
lng: "-82.32483"

https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m

*/

function getForcastParams(lat, lng, isMetric = false) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  let params = {
    latitude: lat,
    longitude: lng,
    daily: ['temperature_2m_max', 'temperature_2m_min'],
    hourly: 'temperature_2m',
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'wind_speed_10m',
      'precipitation',
      'weather_code'
    ],
    timezone: timeZone,
  };

  if (!isMetric) {
    params = {
      ...params,
      wind_speed_unit: 'mph',
      temperature_unit: 'fahrenheit',
      precipitation_unit: 'inch',
    };
  }

  return new URLSearchParams(params);
}

export async function getForcast(lat, lng, isMetric = false) {
  const urlParams = getForcastParams(lat, lng, isMetric);
  return fetch(`${baseForcastURL}?${urlParams.toString()}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => res.json());
}
