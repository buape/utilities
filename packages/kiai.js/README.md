# kiai.js

This package is the official Javascript wrapper for the public API of [Kiai](https://kiaibot.com).

Note: Kiai is still in beta and not yet released. If you want to join the beta, check us out at https://go.kiai.wtf/discord

## Installation

```bash
npm install kiai.js
```

## Usage

```js
import { KiaiClient } from "@buape/experiments"
const client = new KiaiClient("APIKEY")

client.getData("USERID", "GUILDID") // Returns a levelData object

client.addXp("USERID", "GUILDID", 100) // Returns a levelData object
client.setXp("USERID", "GUILDID", 100) // Returns a levelData object
```

Full documentation can be found at https://kiai.js.org/modules
