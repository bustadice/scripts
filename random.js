// This script repeats the following steps:
//  1. Randomly determine a wager size that is permitted.
//  2. For the given wager size, randomly determine a permitted target
//     multiplier.
//  3. Place a bet with the determined parameters and wait for the result.


while (true) {
  // assume a slightly smaller profit limit in case it has decreased by the time
  // our bet has reached the server
  const maxProfit = this.maxProfit * 0.99

  // the largest bet the profit limit will support or our balance, whichever is
  // smaller
  const maxBet = Math.floor(Math.min(this.balance, maxProfit / 0.01))
  const betSize = Math.round((Math.random() * (maxBet - 100) + 100) / 100) * 100

  const maxTarget = Math.floor((maxProfit / betSize + 1) * 100)
  const target = Math.round(Math.random() * (maxTarget - 101) + 101) / 100

  this.log(`Betting ${betSize/100} bits at ${target.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}x.`)
  await this.bet(betSize, target)
}
