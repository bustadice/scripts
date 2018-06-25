const bet = 100                 // how many satoshis to bet
const baseTarget = 2.00         // target multiplier
const stop = 20                 // how big the target can get before stopping the script

const resetTargetOnLoss = false // return to base target on loss?
const lossIncrease = 1.00       // what to increase the target on loss. Ignored if resetTargetOnLoss is true

const resetTargetOnWin = true   // return to base target on win?
const winIncrease = 1.00        // what to increase the target on win. Ignored if resetTargetOnWin is true


let currentTarget = baseTarget
this.log(`Starting payout martingale with a base target of ${baseTarget}`)

while (true) {
  // make the bet and wait for the result
  const { multiplier } = await this.bet(bet, currentTarget)

  if (multiplier < currentTarget) { // loss
    if (resetTargetOnLoss) {
      currentTarget = baseTarget
      this.log(`Lost bet, so resetting target to ${currentTarget}`)
    } else {
      increaseTarget(lossIncrease)
      this.log(`Lost bet, so increasing target to ${currentTarget}`)
    }
  } else { // win
    if (resetTargetOnWin) {
      currentTarget = baseTarget
      this.log(`Won bet, so resetting target to ${currentTarget}`)
    } else {
      increaseTarget(winIncrease)
      this.log(`Won bet, so increasing target to ${currentTarget}`)
    }
  }

  if (currentTarget > stop) {
    this.log(`Target got to ${currentTarget}. Stopping the script`)
    this.stop()
  }
}

function increaseTarget(increase) {
  currentTarget += increase
  currentTarget = Math.round(currentTarget * 100) / 100
}