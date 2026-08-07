import { auth } from "../../../../middleware/auth.ts"
import { fb_users } from "../../../../firebase.ts"

export default {
    method: "GET",
    handler,
    preHandler: auth
}

async function handler(request) {
    const uid = request.user.sub

    const doc = await fb_users.doc(uid).get()

    if (!doc.exists) {
        return {
            success: false,
            code: "USER_NOT_FOUND"
        }
    }

    const { passwordHash: _, ...user } = doc.data()

    return {
        success: true,
        user: {
            uid,
            ...user
        }
    }
}