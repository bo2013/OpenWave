import type { FastifyRequest, RouteOptions } from "fastify"

import { auth } from "../../../middleware/auth.ts"
import { fb_users } from "../../../firebase.ts"

export default {
    method: "GET",
    url: "/api/v1/auth/me",
    handler,
    preHandler: auth
} satisfies RouteOptions

async function handler(request: FastifyRequest) {
    const uid = request.user.sub

    const doc = await fb_users.doc(uid).get()

    if (!doc.exists) {
        return {
            success: false,
            code: "USER_NOT_FOUND"
        }
    }

    const user = doc.data()!

    delete user.passwordHash

    return {
        success: true,
        user: {
            uid,
            ...user
        }
    }
}