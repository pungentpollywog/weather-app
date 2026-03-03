import stylesheet from './SearchInput.css' with { type: 'css' };
import typography from '../typography.css' with { type: 'css' };

export default class SearchInputElement extends HTMLElement {
  _placeholder = 'Search ...';
  _searchText = '';

  static define(tagName = 'search-input') {
    customElements.define(tagName, this);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['placeholder'];
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [typography, stylesheet];
    this.render();
  }

  attributeChangedCallback(name, old, val) {
    if (name === 'placeholder') {
      this.placeholder = val;
    }
    this.render();
  }

  set placeholder(val) {
    this._placeholder = val;
  }

  get placeholder() {
    return this._placeholder;
  }

  set searchText(val) {
    this._searchText = val;
  }

  get searchText() {
    return this._searchText;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <input type="text" name="search-input" id="search-input" placeholder="${this.placeholder}" value="${this.searchText}" />
    `;
  }
}
