# kiai.js

This package is the official Javascript wrapper for the public API of [Kiai](https://kiai.app).

## Installation

```bash
npm install kiai.js
```

## Usage

```js
const client = new KiaiClient("APIKEY")

client.leveling.addXp("GUILDID", "USERID", 100)

client.leveling
	.getLeaderboard("GUILDID")
	.then((lb) => console.log(lb))
	.catch(console.error)
```

Full documentation can be found at https://utilities.buape.com
