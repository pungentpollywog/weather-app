export default class SummaryCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['amount'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const label = this.attributes.label.value;
    const amount = this.attributes.amount.value;
    this.innerHTML = `
      <article>
        <p class="sm-text">${label}</p>
        <p class="lg-text">${amount}</p>
      </article>
      `;
  }
}

customElements.define('summary-card', SummaryCard);
