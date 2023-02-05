# kiai.js

This package is the official Javascript wrapper for the public API of Kiai.

Note: Kiai is still in beta and not yet released. If you want to join the beta, check us out at https://go.kiai.wtf/discord

## Installation

```bash
npm install kiai.js
```

## Usage

```js
import { KiaiClient } from "@buape/experiments"
const client = new KiaiClient("APIKEY")

client.getRank("USERID", "GUILDID")

client.addXp("USERID", "GUILDID", 100)
client.setXp("USERID", "GUILDID", 100)
```
