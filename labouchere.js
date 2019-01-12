var config = {
  loop: { label: "Continue playing after successfully clearing a list?", type: "checkbox", value: true },

  // This is the initial list to start the Labouchere system with. When set to
  // play in a loop, this is also the list that is used after successfully
  // completing one list.
  baseList: { label: "Base list", type: "text", value: "[100, 200, 300]" },

  // The target multiplier. The system generally requires even money bets,
  // i.e. 2.00x payout. Changing this probably also require adapting more code
  // below.
  target: { label: "Target", type: "multiplier", value: 2 }
}


let baseList;
try {
  baseList = JSON.parse(config.baseList.value)
} catch (error ) {
  await this.log("received invalid base list")
  await this.stop()
}

let list = baseList
this.log(`Starting Labouchere with base list ${list}.`);

loop: for (;;) {
  // Determine wager size and the new list in case we win.
  let wager    = 0;
  let listWin  = null;

  switch(list.length) {
  case 0:
    // Finished a list. Loop?
    if (config.loop.value) {
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
  const { multiplier } = await this.bet(wager, config.target.value);

  if (multiplier < config.target.value) { // loss
    list.push(wager);
    this.log(`Bet ${wager} satoshis. Lost. New list: [${list}].`);
  } else { // win
    list = listWin;
    this.log(`Bet ${wager} satoshis. Won. New list [${list}]`);
  }
}
