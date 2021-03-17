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

let list = baseList.slice();
this.log(`Starting Labouchere with base list [${list}].`);

for (;;) {
  // sum first item with last item if it exists
  const wager = list[0] + (list.length > 1 ? list[list.length-1] : 0)

  // make the bet and wait for the result
  const { multiplier } = await this.bet(wager, config.target.value);

  if (multiplier < config.target.value) { // loss
    list.push(wager);
    this.log(`Bet ${wager} satoshis. Lost. New list: [${list}].`);
  } else { // win
    list = list.slice(1, -1);
    const cleared = list.length === 0;
    if (cleared && config.loop.value) {
      list = baseList.slice();
      this.log(`Bet ${wager} satoshis. Won. Reset list [${list}]`);
    } else if (cleared && !config.loop.value) {
      this.log(`Bet ${wager} satoshis. Won. Script finished.`);
      break;
    } else {
      this.log(`Bet ${wager} satoshis. Won. New list [${list}]`);
    }
  }
}
