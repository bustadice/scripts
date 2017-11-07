# Script Editor API
The following fields are provided on `this`:
 - `balance`: Your last known balance
 - `bankroll`: The last known bankroll
 - `maxProfit`: The profit limit in satoshis based on the last known bankroll

Currently these fields are only updated when you call `this.bet`.

All methods are provided on `this` and return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises). Because the script is wrapped in an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), you may use the [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) operator to conveniently handle Promises.

## bet(size, target)
Places a bet and returns a Promise that resolves with the result.

`size` is the amount to bet in satoshis. Only wager sizes that are divisible by 100 (whole bits) are valid.

`target` is the target multiplier, e.g. `1.23` for 1.23x.

The result has the following form:
```js
{
  id:         string, // bet ID
  timestamp:  string, // RFC2822-compliant date string
  value:      number, // bet size in satoshi (same as size argument)
  target:     number, // target multiplier (same as target argument)
  multiplier: number, // bet outcome
  bankroll:   number, // bankroll in satoshis after the bet
  balance:    number  // user balance in satoshis after the bet
}
```

## clearLog()
Clears the log.

## log(...arguments)
Outputs the given arguments to the log. If you want to log objects other than strings and numbers, don't forget to convert them to strings first, e.g. by using [JSON.stringify](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

## newSeedPair(seed)
Reveals the previous seed pair and generates a new one using the given client seed. If no client seed is provided, one is generated randomly.

Calling `newSeedPair` will fail if the current seed pair is unused, i.e. if no bets have been made with it yet.

The result has the following form:
```js
{
  prev_server_seed: string, // previous server seed
  prev_client_seed: string, // previous client seed

  server_seed_hash: string  // hash of new server seed
}
```

## setClientSeed(seed)
Set the client seed. If no client seed is provided, one is generated randomly.

Calling `setClientSeed` will fail if the current seed pair has already been used, i.e. if bets have been made with it.

## skip()
Skips the next bet.

The result has the following form:
```js
{
  id:         string, // bet ID
  timestamp:  string, // RFC2822-compliant date string
  multiplier: number  // bet outcome
}
```

## stop()
Instructs the script editor to stop the script.


# Examples
 - [Martingale](martingale.js), which follows the [Martingale system](https://en.wikipedia.org/wiki/Martingale_(betting_system))
 - [Labouchère](labouchere.js), which follows the [Labouchère system](https://en.wikipedia.org/wiki/Labouch%C3%A8re_system)
 - [Random](random.js), which bets random amounts with random target multipliers.
 - [Seed](seed.js), which requests a new seed pair and then sets a new client seed
