# @buape/experiments

This package is the official Javascript wrapper for the public API of Kiai.

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
