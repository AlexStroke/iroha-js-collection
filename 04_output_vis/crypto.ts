import { init, crypto } from '@iroha2/crypto-target-web'

// using top-level module await
await init()

export { crypto }