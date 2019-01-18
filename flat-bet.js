var config = {
  wager: { label: "Wager", type: "balance", value: 100 },
  target: { label: "Target", type: "multiplier", value: 1000 }
};

while (true) {
    const { multiplier } = await this.bet(config.wager.value, config.target.value)
    if (multiplier >= config.target.value) {
        break
    }
}