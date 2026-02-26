export default class HourlyCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['icon', 'hour', 'temp', 'desc'];
  }

  attributeChangedCallback(name, oldValue, value) {
    this.render();
  }

  render() {
    const iconURL = this.attributes.icon.value;
    const desc = this.attributes.desc.value;
    const hour = this.attributes.hour.value;
    const temp = this.attributes.temp.value;

    this.innerHTML = `
      <article>
        <div class="visual">
          <img src="${iconURL}" alt="${desc}">
          <p class="sm-text">${hour}</p>        
        </div>
        <p class="xs-text">${temp}</p>
      </article>
    `;
  }
}

customElements.define('hourly-card', HourlyCard);
