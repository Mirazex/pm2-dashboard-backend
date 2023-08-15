import crypto from "crypto"

export function getRandomHash() {
    return crypto.randomBytes(20).toString('hex')
}
