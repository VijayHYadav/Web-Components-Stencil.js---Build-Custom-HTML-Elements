class Tooltip extends HTMLElement {
    constructor() {
        super();
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        // to access web component object
        this.appendChild(tooltipIcon);
    }
}

customElements.define('uc-tooltip', Tooltip);