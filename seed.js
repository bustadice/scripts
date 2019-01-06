var config = {
    clientSeed: { label: "Client seed", type: "text", value: "This is my new client seed." }
}


// This script assumes that the current seed pair is already used, i.e. that bets have been placed
// with it. It will fail if the current seed pair is unused.

// request a new server seed using a random client seed
const { server_seed_hash } = await this.newSeedPair()
await this.log("The new server seed has the hash:", server_seed_hash)

// set the client seed
await this.setClientSeed(config.clientSeed.value)
await this.log("The client seed was set to:", config.clientSeed.value)
