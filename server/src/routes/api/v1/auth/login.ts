import type { FastifyRequest, FastifyReply } from "fastify"
import type { ApiRoute, AuthBody } from "../../../../types.ts"
import { authBodySchema } from "../../../../schemas.ts"
import { GetUserByEmail } from "../../../../services/user.ts"
import argon2 from "argon2"
import Cookie from "../../../../Cookie.ts"

export default {
    method: "POST",
    schema: authBodySchema,
    handler
} satisfies ApiRoute

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const {email, password} = request.body as AuthBody

    const user = await GetUserByEmail(email)

    // Check #1: Check is the user exists
    if (!user) {
        return {success: false, "code": "USER_NOT_FOUND"}
    }

    // Check #2: Password match
    if (!(await argon2.verify(user.passwordHash, password))) {
        return {success: false, "code": "WRONG_PASSWORD"}
    }

    // Final: Set user id into cookie
    new Cookie(reply).setCookie(
        reply.server.jwt.sign(
            {
                sub: user.uid,
            },
            {
                expiresIn: "7d"
            }
        )
    )

    return { success: true }
}