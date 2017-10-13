// WARNING: This script is not throttled in any way. There is a good chance that
// your browser will freeze and that you won't be able to stop the script until
// all bets have been made.
//
// Assume that all bets will be placed and only run this script if you accept
// that!


const betSize = 100  // how many satoshis to bet
const target = 2.00  // target multiplier
const betCount = 50  // number of bets to make


for (let i = 0; i < betCount; i++) {
  this.bet(betSize, target).catch(this.stop)
}
