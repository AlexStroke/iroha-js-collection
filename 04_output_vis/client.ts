import { Client, setCrypto } from '@iroha2/client'
import { KeyPair } from '@iroha2/crypto-core'
import { hexToBytes } from 'hada'
import { AccountId } from '@iroha2/data-model'

// importing already initialized crypto
import { crypto } from './crypto'

// a config with stringified keys
import client_config from './config'

setCrypto(crypto)

export const client = new Client({
  torii: {
    // these ports are specified in the peer's own config
    apiURL: `http://localhost:8080`,
    telemetryURL: `http://localhost:8081`,
  },
  // Account name and the domain where it's registered
  accountId: client_config.account as AccountId,
  // A key pair, required for the account authentication
  keyPair: generateKeyPair({
    publicKeyMultihash: client_config.publicKey,
    privateKey: client_config.privateKey,
  }),
})

// an util function
function generateKeyPair(params: {
  publicKeyMultihash: string
  privateKey: {
    digestFunction: string
    payload: string
  }
}): KeyPair {
  const multihashBytes = Uint8Array.from(
    hexToBytes(params.publicKeyMultihash),
  )
  const multihash = crypto.createMultihashFromBytes(multihashBytes)
  const publicKey = crypto.createPublicKeyFromMultihash(multihash)
  const privateKey = crypto.createPrivateKeyFromJsKey(params.privateKey)

  const keyPair = crypto.createKeyPairFromKeys(publicKey, privateKey)

  for (const x of [publicKey, privateKey, multihash]) {
    x.free()
  }

  return keyPair
}