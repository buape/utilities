# kiai.js

This package is the official Javascript wrapper for the public API of [Kiai](https://kiaibot.com).

## Installation

```bash
npm install kiai.js
```

## Usage

```js
import { KiaiClient } from "kiai.js"
const client = new KiaiClient("APIKEY")

client.getData("USERID", "GUILDID") // Returns a levelData object

client.addXp("USERID", "GUILDID", 100) // Returns a levelData object
client.setXp("USERID", "GUILDID", 100) // Returns a levelData object
```

Full documentation can be found at https://utilities.buape.com
