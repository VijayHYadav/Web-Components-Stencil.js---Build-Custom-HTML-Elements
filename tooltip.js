// IMP: if you want to style ANY slotted content, you can use ::slotted(*).
// :host(*) || :host(.important)
// Light DOM styling overrides shadom-dom(slot) styling.
class Tooltip extends HTMLElement {
    constructor() {
        super();
        // this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = 'Some dummy tooltip text.';
        this.attachShadow({ mode: 'open' })
        // const template = document.querySelector('#tooltip-template')
        // this.shadowRoot.appendChild(template.content.cloneNode(true))
        // defining-the-template-in-js
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.6rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }

                :host(.important) {
                    background: var(--color-primary, #ccc);
                    padding: 0.15rem;
                }

                :host-context(p) {
                    font-weight: bold;
                }
                
                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }

                .icon {
                    background-color: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Some Default</slot>
            <span class="icon">?</span>
        `;
    }
    
    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        // to access web component object
        this.shadowRoot.appendChild(this._tooltipIcon);
        this.style.position = 'relative'
        this._render();

    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue)
        if (oldValue === newValue) {
            return;
        }
        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
        // return ['text', 'class'];
    }

    disconnectedCallback() {
        // may clean up http request you are doing or some clean up stuff.
        console.log('Disconnected!')
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;

            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    // this indicates means this method will only call by this class itself.
    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
        // this._tooltipContainer = document.createElement('div');
        // this._tooltipContainer.textContent = this._tooltipText;

        // this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
        // this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('uc-tooltip', Tooltip);