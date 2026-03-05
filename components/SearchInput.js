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
    return ['placeholder', 'searchtext'];
  }

  handleChange(ev) {
    ev.stopPropagation();
    console.log('emit search input ev');
    this.emit('update', ev.target.value);
  }

  emit(type, detail) {
    let event = new CustomEvent(`search-input-${type}`, {
      bubbles: true,
      cancelable: true,
      detail: detail,
    });

    return this.dispatchEvent(event);
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [typography, stylesheet];
    this.render();
    this.inputEl = this.shadowRoot.querySelector('input');
    this.inputEl.addEventListener('input', this.handleChange.bind(this));
  }

  attributeChangedCallback(name, old, val) {
    switch (name) {
      case 'placeholder':
        this.placeholder = val;
        break;
      case 'searchtext':
        this.searchText = val;
        break;
    }
    this.render();
  }

  disconnectedCallback() {
    this.inputEl?.removeEventListener('input', this.handleChange.bind(this));
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

  reset() {
    const inputEl = this.shadowRoot.querySelector('input');
    inputEl.value = '';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <input type="text" name="search-input" id="search-input" placeholder="${this.placeholder}" value="${this.searchText}" />
    `;
  }
}
