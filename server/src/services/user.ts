import type { User } from "../types"

import { fb_users, fb_emailmapping } from "../firebase.ts"

export async function GetUserByEmail(email: string): Promise<User | undefined> {
    const emailDoc = await fb_emailmapping.doc(email).get()

    if (!emailDoc.exists) {
        return undefined
    }

    return GetUserByUUID(emailDoc.get("uid"))
}

export async function GetUserByUUID(uid: string): Promise<User | undefined> {
    const doc = await fb_users.doc(uid).get()

    if (!doc.exists) {
        return undefined
    }

    return {
        uid: doc.id,
        ...doc.data()
    } as User
}