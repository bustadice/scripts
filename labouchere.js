// Continue playing after successfully clearing a list?
const loop = true;
// This is the initial list to start the Labouchere system with. When set to
// play in a loop, this is also the list that is used after successfully
// completing one list.
const baseList = [100,200,300];
// The target multiplier. The system generally requires even money bets,
// i.e. 2.00x payout. Changing this probably also require adapting more code
// below.
const target   = 2.00;

let list = baseList;
this.log(`Starting Labouchere with base list ${baseList}.`);

loop: for (;;) {
  // Determine wager size and the new list in case we win.
  let wager    = 0;
  let listWin  = null;

  switch(list.length) {
  case 0:
    // Finished a list. Loop?
    if (loop) {
      list = baseList;
      continue loop;
    } else {
      break loop;
    }
  case 1:
    wager   = list[0];
    listWin = [];
    break;
  default:
    wager   = list[0] + list[list.length-1];
    listWin = list.slice(1,-1);
    break;
  }

  // make the bet and wait for the result
  const { multiplier } = await this.bet(wager, target);

  if (multiplier < target) { // loss
    list.push(wager);
    this.log(`Bet ${wager} satoshis. Lost. New list: [${list}].`);
  } else { // win
    list = listWin;
    this.log(`Bet ${wager} satoshis. Won. New list [${list}]`);
  }
}
