import stylesheet from './SelectableList.css' with { type: 'css' };
import typography from '../typography.css' with { type: 'css' };

export default class SelectableListElement extends HTMLElement {
  items = [];
  selected = null;

  static define(tagName = 'selectable-list') {
    customElements.define(tagName, this);
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [typography, stylesheet];
    this.render();
  }

  static get observedAttributes() {
    return ['items', 'selected'];
  }

  render() {
    const listEl = document.createElement('ul');

    this.items.forEach(item => {
      const itemEl = document.createElement('li');
      itemEl.setInnerText = item;
      listEl.appendChild(itemEl)
    })

    this.shadowRoot.appendChild(listEl);

  }
}
