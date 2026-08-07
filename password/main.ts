import { ZxcvbnFactory } from "@zxcvbn-ts/core"
import { dictionary, adjacencyGraphs } from "@zxcvbn-ts/language-common"
import { dictionary as enDictionary, translations } from "@zxcvbn-ts/language-en"


const zxcvbn = new ZxcvbnFactory({
    dictionary: {
        ...dictionary,
        ...enDictionary
    },
    graphs: adjacencyGraphs,
    translations
})

export const PasswordInfo = {
    GOOD: "GOOD",
    TOO_SHORT: "TOO_SHORT",     // Size limit (in config)
    TOO_LONG: "TOO_LONG",       // Size limit (in config)
    BLACKLISTED: "BLACKLISTED", // Blacklist (in config)
    BAD: "BAD"                  // zxcvbn + score level in config
} as const

export type PasswordInfo = typeof PasswordInfo[keyof typeof PasswordInfo]

export interface PasswordPolicy {
    length: {
        min: number
        max: number
    }

    blacklist: string[]

    zxcvbn: {
        enabled: boolean
        minScore: number
    }
}

export function CheckPassword(password: string, config: PasswordPolicy) {
    // Check #1: Length
    const { min, max } = config.length
    
    if (password.length < min) {
        return {
            status: PasswordInfo.TOO_SHORT,
            additional_info: min
        }
    }

    if (password.length > max) {
        return {
            status: PasswordInfo.TOO_LONG,
            additional_info: max
        }
    }

    // Check #2: Blacklist
    if (config.blacklist.some(item => password.toLowerCase().includes(item.toLowerCase()))) {
        return {
            status: PasswordInfo.BLACKLISTED,
        }
    }

    // Check #3: zxcvbn
    if (config.zxcvbn.enabled && zxcvbn.check(password).score < config.zxcvbn.minScore) {
        return {
            status: PasswordInfo.BAD,
        }
    }

    return {
        status: PasswordInfo.GOOD
    }
}