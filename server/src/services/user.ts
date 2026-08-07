import type { User } from "../types"

import { fb_users } from "../firebase.ts"

export async function GetUserByEmail(email: string): Promise<User | undefined> {
    const snapshot = await fb_users.where("email", "==", email).limit(1).get()

    if (snapshot.empty) {
        return undefined
    }

    const doc = snapshot.docs[0]
    return {
        uid: doc.id,
        ...doc.data()
    } as User
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