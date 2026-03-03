import UnitsConfigElement from './components/UnitsConfig.js';
import SearchInputElement from './components/SearchInput.js';

import 'https://unpkg.com/boxicons@latest/dist/boxicons.js';

import { geoSearch, getForcast } from './services/weatherAPI.js';

UnitsConfigElement.define();
SearchInputElement.define();

let unitsConfigExpanded = 'false';
let unitsMetric = 'false';

function toggleStrBool(val) {
  return JSON.stringify(!JSON.parse(val));
}

function toggleVisibility() {
  unitsConfigExpanded = toggleStrBool(unitsConfigExpanded);
  this.setAttribute('expanded', unitsConfigExpanded);
}

function init() {
  const unitsConfig = document.querySelector('units-config');
  unitsConfig.setAttribute('expanded', unitsConfigExpanded);
  unitsConfig.setAttribute('metric', unitsMetric);
  unitsConfig.addEventListener('click', toggleVisibility);
}

function test() {
  geoSearch('Gainesville,Florida').then((data) => {
    console.log(data);
    if (data[0]) {
      getForcast(data[0].lat, data[0].lng).then(console.log);
    }
  });
}

init();

test();
