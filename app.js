import UnitsConfigElement from './components/UnitsConfig.js';
import 'https://unpkg.com/boxicons@latest/dist/boxicons.js';

UnitsConfigElement.define();

let unitsConfigExpanded = 'false';
let unitsMetric = 'true';

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

init();