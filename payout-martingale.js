var config = {
  bet: { label: "Bet", type: "balance", value: 100 },                 // how many satoshis to bet
  baseTarget: { label: "Base target", type: "multiplier", value: 2 }, // target multiplier
  stop: { label: "Stop", type: "multiplier", value: 20 },             // how big the target can get before stopping the script

  resetTargetOnLoss: { label: "Reset target on loss", type: "checkbox", value: false }, // return to base target on loss?
  lossIncrease: { label: "Increase on loss", type: "multiplier", value: 1 },            // what to increase the target on loss. Ignored if resetTargetOnLoss is true

  resetTargetOnWin: { label: "Reset target on win", type: "checkbox", value: true }, // return to base target on win?
  winIncrease: { label: "Increase on win", type: "multiplier", value: 1 }            // what to increase the target on win. Ignored if resetTargetOnWin is true
}


let currentTarget = config.baseTarget.value
this.log(`Starting payout martingale with a base target of ${config.baseTarget.value}`)

while (true) {
  // make the bet and wait for the result
  const { multiplier } = await this.bet(config.bet.value, currentTarget)

  if (multiplier < currentTarget) { // loss
    if (config.resetTargetOnLoss.value) {
      currentTarget = config.baseTarget.value
      this.log(`Lost bet, so resetting target to ${currentTarget}`)
    } else {
      increaseTarget(config.lossIncrease.value)
      this.log(`Lost bet, so increasing target to ${currentTarget}`)
    }
  } else { // win
    if (config.resetTargetOnWin.value) {
      currentTarget = config.baseTarget.value
      this.log(`Won bet, so resetting target to ${currentTarget}`)
    } else {
      increaseTarget(config.winIncrease.value)
      this.log(`Won bet, so increasing target to ${currentTarget}`)
    }
  }

  if (currentTarget > config.stop.value) {
    this.log(`Target got to ${currentTarget}. Stopping the script`)
    this.stop()
  }
}

function increaseTarget(increase) {
  currentTarget += increase
  currentTarget = Math.round(currentTarget * 100) / 100
}