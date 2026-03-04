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
      return rawLocs.map(({ geonameId: id, name, lat, lng }) => ({ id, name, lat, lng }));
    })
    .then((locs) => {
      console.log({ locs });
      const selectableListEl = document.querySelector('selectable-list.search');
      selectableListEl.setAttribute('items', JSON.stringify(locs));
    });
}

function setSearchText(ev) {
  searchText = ev.detail;
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
}

init();
