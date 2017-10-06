const baseBet = 100     // how many satoshis to bet initially
const target = 2.00     // target multiplier
const betMultiplier = 2 // what to multiply the bet size by when we lose a wager


let lossCount = 0
this.log(`Starting martingale with a base bet of ${baseBet} satoshis.`)

while (true) {
  // make the bet and wait for the result
  const { multiplier } = await this.bet(betSize(lossCount), target)

  if (multiplier < target) { // loss
    lossCount++
    this.log(`Lost bet. Multiplying bet size by ${betMultiplier} for new bet size of ${betSize(lossCount)} satoshis.`)
  } else { // win
    lossCount = 0
    this.log(`Won bet. Setting bet size to ${baseBet} satoshis.`)
  }
}

function betSize(lossCount) {
  const bet = baseBet * Math.pow(betMultiplier, lossCount)
  return Math.round(bet / 100) * 100
}
