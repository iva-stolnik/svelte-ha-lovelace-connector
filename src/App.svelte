<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export let config = {};
    export let hass = {};

    let configIn = writable({});
    let haStatus = writable('');

    // Method to call a service
    function callService(domain, service, serviceData) {
        if (hass && hass.callService) {
            hass.callService(domain, service, serviceData);
        } else {
            console.error("Home Assistant instance (hass) or callService method is not available.");
        }
    }

    // Method to call a WebSocket
    function callWebSocket(type, domain, service, serviceData) {
        if (hass && hass.callWS) {
            const message = {
                type: type,
                domain: domain,
                service: service,
                service_data: serviceData
            };
            hass.callWS(message);
        } else {
            console.error("Home Assistant instance (hass) or callWS method is not available.");
        }
    }

    onMount(() => {
        if (config) {
            const configOut = JSON.stringify(config)
            configIn.set(configOut);
        }

        if (hass) {
            haStatus.set('HA Connected');
        } else {
            haStatus.set('No HA Connection');
        }
    });
</script>

<ha-card style="padding:1em;">
    <h1>Configuration</h1>
    <p>{$configIn}</p>
    <h2>Status: {$haStatus}</h2>
    <div>
        <button on:click={() => callService('light', 'toggle', { entity_id: config.entity_id})}>
            Toggle Light (call service)
        </button>
    </div>
    <div>
        <button on:click={() => callWebSocket('call_service', 'light', 'toggle', { entity_id: config.entity_id })}>
            Toggle Light (call websocket)
        </button>
    </div>
</ha-card>
