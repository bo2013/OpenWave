import type { User } from "../types"

import { fb_users, fb_emailmapping } from "../firebase.ts"

export async function GetUserByEmail(email: string): Promise<User | undefined> {
    const doc = await fb_emailmapping.doc(email).get()
    if (doc.exists) {
        return {
            uid: doc.get("uid"),
            ...(await fb_users.doc(doc.get("uid")).get()).data()
        } as User
    } else {
        return undefined
    }
}