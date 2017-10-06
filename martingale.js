const baseBet = 100     // how many satoshis to bet initially
const target = 2.00     // target multiplier
const betMultiplier = 2 // what to multiply the bet size by when we lose a wager


let betSize = baseBet
this.log(`Starting martingale with a base bet of ${baseBet} satoshis.`)

while (true) {
  // make the bet and wait for the result
  const { multiplier } = await this.bet(betSize, target)

  if (multiplier < target) { // loss
    betSize *= betMultiplier
    betSize = Math.round(betSize / 100) * 100 // round bet to nearest valid one
    this.log(`Lost bet. Multiplying bet size by ${betMultiplier} for new bet size of ${betSize} satoshis.`)
  } else { // win
    betSize = baseBet
    this.log(`Won bet. Setting bet size to ${baseBet} satoshis.`)
  }
}
