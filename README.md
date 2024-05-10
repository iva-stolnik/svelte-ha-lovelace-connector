# Svelte Home Assistant Custom Component AND Lovelace Connector

### IMPORTANT NOTES:
   * development is separated from HA server and svelte is not required to be installed on HA server
   * `/local/` is `/config/www/` directory in HA
   * `/config/www/` is exposed to lovelace dashboard, it's starting point on HA server
   * Idea is to use HTMLElement to get access to its setConfig method (lovelace requirement)
        - this retrieves config from lovelace card yaml
        - HTMLElement is othervise dumb and serves only as a wrapper for svelte component that passes config
        - whole state management and comunication can be done in svelte component
        - pass whole `hass` object and utilize its functionality
   * In case you want to use hacs.json and to be able to add **your new repository to HACS** as custom repo
        - hacs.json is already added to this repo
        - before commiting and pushing changes to git, run `npm run build`
        - after code is pushed to git, create release and add new tag
        - go in HACS and add your repo, or redownload new version

#### Clone project:
```
   git clone https://github.com/iva-stolnik/svelte-ha-lovelace-connector
   npm install
   npm run dev
```

Build svelte custom component:
```
   npm run build
```
   * output in dist/ dir will be used in Home Assistant

### Home Aassistant setup:
**if using HACS skip both steps**
#### In HA /config/www/ create file:
   * svelte-custom-card.js // or any other name
      * here copy paste build output from `main_prod.js` after you run `npm run build`

#### Setup dashboard:
   * open dashboards -> 3 dots in right corner -> resources -> ADD RESOURCES
   * setup paths for new component: 
```
   /local/svelte-custom-card.js // for svelte component
```
   * setup resource type to JS module for both components
   * on your dashboard create new card -> show code editor -> paste following:
   ```
type: custom:lit-custom-card
someProp: You did it legend :)
   ```
   * save card -> exit dashboard editor

## THATS IT!
