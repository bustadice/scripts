// WARNING: This script is not throttled in any way. There is a good chance that
// your browser will freeze and that you won't be able to stop the script until
// all bets have been made.
//
// Assume that all bets will be placed and only run this script if you accept
// that!


const betCount = 30 // number of bets to skip


for (let i = 0; i < betCount; i++) {
  this.skip().catch(this.stop)
}
