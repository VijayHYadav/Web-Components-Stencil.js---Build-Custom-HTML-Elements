class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
    }

    connectedCallback() {
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        // to access web component object
        this.appendChild(tooltipIcon);

    }

    // this indicates means this method will only call by this class itself.
    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = 'This is tooltip text!';
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.removeChild(this._tooltipContainer);
    }
}

customElements.define('uc-tooltip', Tooltip);