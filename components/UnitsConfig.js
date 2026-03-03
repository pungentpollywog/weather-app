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
  _isMetric = true;
  _isExpanded = false;

  static define(tagName = 'units-config') {
    customElements.define(tagName, this);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['expanded', 'metric'];
  }

  set expanded(val) {
    this._isExpanded = val;
  }

  get expanded() {
    return this._isExpanded;
  }

  set metric(val) {
    this._isMetric = val;
  }

  get metric() {
    return this._isMetric;
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [typography, stylesheet];
    this.render();
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  attributeChangedCallback(name, old, val) {
    switch (name) {
      case 'expanded':
        this.expanded = JSON.parse(val);
        break;
      case 'metric':
        this.metric = JSON.parse(val);
        break;
    }

    this.render();
  }

  attachCategory(cat, parentEl) {
    const listEl = document.createElement('ul');
    const keyToMatch = this._isMetric ? 'metric' : 'imperial';
    parentEl.appendChild(listEl);
    const listItemEl = document.createElement('li');
    listItemEl.classList.add('xs-text', 'label');
    listItemEl.innerHTML = cat.name;
    listEl.appendChild(listItemEl);
    for (const [key, value] of Object.entries(cat.options)) {
      const listItemEl = document.createElement('li');
      listItemEl.classList.add('sm-text', 'option');
      listItemEl.innerHTML = value;
      if (key === keyToMatch) {
        const iconEl = document.createElement('box-icon');
        iconEl.setAttribute('name', 'check');
        iconEl.setAttribute('size', 'sm');
        listItemEl.appendChild(iconEl);
      }
      listEl.appendChild(listItemEl);
    }
  }

  attachCategories() {
    const articleEl = document.createElement('article');
    articleEl.innerHTML = `<button id="type-toggle">Switch to ${this._isMetric ? 'Imperial' : 'Metric'}</button>`;

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
      <button type="button" id="config-btn">
        <img src="./assets/images/icon-units.svg" alt="gear icon">
        Units
        <img src="./assets/images/icon-dropdown.svg" alt="drop down icon">
      </button>
    `;

    this._isExpanded && this.attachCategories();
  }
}
