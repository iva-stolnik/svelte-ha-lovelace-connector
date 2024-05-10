// main.js
import MyComponent from './App.svelte';

class SvelteCustomCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.svelteApp = null;
        this.config = {};
    }

    set hass(hass) {
        this.config.hass = hass;
        this.updateProps();
    }

    setConfig(config) {
        if (!config) return;
        this.config.config = config;
        this.updateProps();
    }

    updateProps() {
        if (this.svelteApp) {
            this.svelteApp.$set(this.config);
        }
    }

    connectedCallback() {
        this.svelteApp = new MyComponent({
            target: this.shadowRoot,
            props: this.config,
        });
    }

    disconnectedCallback() {
        if (this.svelteApp) {
            this.svelteApp.$destroy();
            this.svelteApp = null;
        }
    }
}

if (!customElements.get('svelte-custom-card')) {
    customElements.define('svelte-custom-card', SvelteCustomCard);
}

window.customCards = window.customCards || [];
const cardType = 'svelte-custom-card';

if (!window.customCards.some(item => item.type === cardType)) {
    window.customCards.push({
        type: cardType,
        name: 'Svelte Custom Card',
        preview: true,
        description: 'A custom card created in Svelte',
    });
}
