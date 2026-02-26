import stylesheet from './UnitsConfig.css' with { type: 'css' };
import typography from '../typography.css' with { type: 'css' };

const categories = [
  {
    name: 'Temperature',
    options: {
      metric: 'Celsius (&deg;C)',
      imperial: 'Fahrenheit (&deg;F)',
    },
  },
  {
    name: 'Wind Speed',
    options: {
      metric: 'km/h',
      imperial: 'mph',
    },
  },
  {
    name: 'Precipitation',
    options: {
      metric: 'Millimeters (mm)',
      imperial: 'Inches (in)',
    },
  },
];

export default class UnitsConfigElement extends HTMLElement {
  isMetric = true;

  static define(tagName = 'units-config') {
    customElements.define(tagName, this);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [stylesheet, typography];
    this.render();
  }

  attachCategory(cat, parentEl) {
    const listEl = document.createElement('ul');
    const keyToMatch = this.isMetric ? 'metric' : 'imperial';
    parentEl.appendChild(listEl);
    const listItemEl = document.createElement('li');
    listItemEl.classList.add('xs-text', 'label');
    listItemEl.innerHTML = cat.name;
         listEl.appendChild(listItemEl);
    for (const [key, value] of Object.entries(cat.options)) {
      const listItemEl = document.createElement('li');
      listItemEl.classList.add('sm-text', 'option');
      listItemEl.innerHTML = value;
      if ( key === keyToMatch) {
        const iconEl = document.createElement('box-icon');
        iconEl.setAttribute('name', 'check');
        iconEl.setAttribute('size', 'sm')
        listItemEl.appendChild(iconEl);
      }
      listEl.appendChild(listItemEl);
    }
  }

  attachCategories() {
    const articleEl = document.createElement('article');
    articleEl.innerHTML = `<button>Switch to ${this.isMetric ? 'Imperial' : 'Metric'}</button>`;

    const mainListEl = document.createElement('ul');
    articleEl.appendChild(mainListEl);

    categories.forEach((cat) => {
      const listItemEl = document.createElement('li');
      mainListEl.appendChild(listItemEl);
      this.attachCategory(cat, listItemEl);
    });

    this.shadowRoot.appendChild(articleEl);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <button type="button">
        <img src="./assets/images/icon-units.svg" alt="gear icon">
        Units
        <img src="./assets/images/icon-dropdown.svg" alt="drop down icon">
      </button>
    `;

    this.attachCategories();
  }
}
