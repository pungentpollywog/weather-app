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
  .then(res => res.json())
  .then(res => res.geonames);
}

/* 
lat: "29.65163"
lng: "-82.32483"

https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m

*/

export function getForcast(lat, lng) {
  console.log(baseForcastURL, lat,lng);
  return fetch(`${baseForcastURL}?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&current=temperature_2m`).then(res => res.json());
}