import { loadStyleSheets } from '../helpers/cssLoader.js';

export default class SelectableListElement extends HTMLElement {
  _items = []; // {id: string, name: string}
  _selected = null; // number or null;

  static define(tagName = 'selectable-list') {
    customElements.define(tagName, this);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = await loadStyleSheets(
      ['../typography.css', './SelectableList.css'].map((path) => new URL(path, import.meta.url)),
    );
    this.render();
  }

  static get observedAttributes() {
    return ['items', 'selected'];
  }

  attributeChangedCallback(name, old, val) {
    switch (name) {
      case 'items':
        this.items = val;
        break;
      case 'selected':
        this.selected = val;
        break;
    }
    this.render();
  }

  get selected() {
    return this._selected;
  }

  set selected(val) {
    this._selected = Number(val);
  }

  get items() {
    return this._items;
  }

  set items(val) {
    this._items = JSON.parse(val);
  }

  handleSelection(ev) {
    // console.log('make selection', ev.target.value);
    ev.stopPropagation();
    const selectedItem = this.items.find((item) => item.id === +ev.target.dataset.id);
    // console.log(ev.target.dataset, selectedItem);
    this.emit('update', selectedItem);
  }

  emit(type, detail) {
    let event = new CustomEvent(`selectable-list-${type}`, {
      bubbles: true,
      cancelable: true,
      detail: detail,
    });

    return this.dispatchEvent(event);
  }

  disconnectedCallback() {
    this.listEl?.removeEventListener('click', this.handleSelection.bind(this));
  }

  render() {
    this.listEl = document.createElement('ul');
    this.listEl.addEventListener('click', this.handleSelection.bind(this));

    this.items.forEach((item) => {
      console.log({ item });
      const itemEl = document.createElement('li');
      itemEl.dataset.id = item.id;
      itemEl.innerText = item.name;
      itemEl.classList.add('sm-text');
      if (this.selected === item.id) {
        itemEl.classList.add('selected');
      }
      this.listEl.appendChild(itemEl);
    });
    this.shadowRoot.innerHTML = '';
    this.items?.length > 0 && this.shadowRoot.appendChild(this.listEl);
  }
}
