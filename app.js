import UnitsConfigElement from './components/UnitsConfig.js';
import SearchInputElement from './components/SearchInput.js';
import SelectableListElement from './components/SelectableList.js';

import 'https://unpkg.com/boxicons@latest/dist/boxicons.js';

import { geoSearch, getForcast } from './services/weatherAPI.js';

let unitsConfigExpanded = 'false';
let unitsMetric = 'false';
let searchText = '';
let selectedLocation = null;

function toggleStrBool(val) {
  return JSON.stringify(!JSON.parse(val));
}

function toggleVisibility() {
  unitsConfigExpanded = toggleStrBool(unitsConfigExpanded);
  this.setAttribute('expanded', unitsConfigExpanded);
}

function doGeoSearch() {
  geoSearch(searchText)
    .then((rawLocs) => {
      console.log({ rawLocs });
      return rawLocs.map(({ geonameId: id, name, lat, lng }) => ({ id, name, lat, lng }));
    })
    .then((locs) => {
      updateSelectableList(locs);
    });
}

function updateSelectableList(items) {
  const selectableListEl = document.querySelector('selectable-list.search');
  selectableListEl.setAttribute('items', JSON.stringify(items));
}

function resetSearchInput() {
  const searchInput = document.querySelector('search-input');
  searchInput.reset();
}

function currentDate() {
  const optionsComponents = {
    weekday: 'long', // "Thursday"
    year: 'numeric', // "2026"
    month: 'long', // "March"
    day: 'numeric', // "5"
  };
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  return new Intl.DateTimeFormat(locale, optionsComponents).format(new Date());
}

function getConditionIconUrl(code) {
  const baseUrl = './assets/images/';
  let filename = 'icon-error.svg';

  switch (code) {
    case 0:
    case 1:
      filename = 'icon-sunny.webp'
      break;
    case 2:
      filename = 'icon-partly-cloudy.webp';
      break;
    case 3:
      filename = 'icon-overcast.webp';
      break;
    case 45:
    case 48:
      filename = 'icon-fog.webp';
      break;
    case 51:
    case 53:
    case 55:
      filename = 'icon-drizzle.webp';
      break;
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      filename = 'icon-rain.webp';
      break;
    case 71:
    case 73:
    case 75:
      filename = 'icon-snow.webp';
      break;
    case 95:
    case 96:
    case 99:
      filename = 'icon-storm.webp';
      break;
  }

  console.log('use icon image', `${baseUrl}${filename}`);

  return `${baseUrl}${filename}`;
}

function updateOverview(currentTemp, weatherCode) {
  const locEl = document.querySelector('.overview .loc');
  locEl.innerText = selectedLocation?.name;
  const dayEl = document.querySelector('.overview .date');
  dayEl.innerText = currentDate();
  const tempEl = document.querySelector('.overview .temp');
  tempEl.innerHTML = `${currentTemp}&deg;`;
  const condEl = document.querySelector('.overview .conditions img');
  console.log(condEl);
  condEl.setAttribute('src', getConditionIconUrl(weatherCode));
}

function setSearchText(ev) {
  searchText = ev.detail;
  console.log({searchText});
}

function getLocForcast(ev) {
  selectedLocation = ev.detail;
  resetSearchInput();
  updateSelectableList([]);
  showDashLoading();
  getForcast(selectedLocation.lat, selectedLocation.lng)
    .then((forcast) => udpateDashForcast(forcast))
    .catch((err) => {
      console.error(err);
      showDashError();
    });
}

function showDashLoading() {
  console.log('TODO: show loading spinners and placeholders');
}

function udpateDashForcast(forcast) {
  // TODO: populate dashboard element with forcast data
  console.log({ forcast });
  // update all the DOM elements
  updateOverview(forcast.current.temperature_2m, forcast.current.weather_code);
}

function showDashError() {
  console.log("TODO: show 'Something went wrong' card with Retry button");
}

function init() {
  UnitsConfigElement.define();
  SearchInputElement.define();
  SelectableListElement.define();

  const unitsConfig = document.querySelector('units-config');
  unitsConfig.setAttribute('expanded', unitsConfigExpanded);
  unitsConfig.setAttribute('metric', unitsMetric);
  unitsConfig.addEventListener('click', toggleVisibility);

  const searchBtn = document.querySelector('article.search button.primary');
  searchBtn.addEventListener('click', doGeoSearch);

  const searchInput = document.querySelector('search-input');
  searchInput.addEventListener('search-input-update', setSearchText);

  const selectableListEl = document.querySelector('selectable-list.search');
  selectableListEl.addEventListener('selectable-list-update', getLocForcast);
}

init();
