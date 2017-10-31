// This script assumes that the current seed pair is already used, i.e. that bets have been placed
// with it. It will fail if the current seed pair is unused.


const clientSeed = "This is my new client seed."

// request a new server seed using a random client seed
const { server_seed_hash } = await this.newSeedPair()
await this.log("The new server seed has the hash:", server_seed_hash)

// set the client seed
await this.setClientSeed(clientSeed)
await this.log("The client seed was set to:", clientSeed)
