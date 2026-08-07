import type { FastifyRequest, FastifyReply } from "fastify"
import type { AuthBody, ApiRoute } from "../../../../types.ts"

import { authBodySchema } from "../../../../schemas.ts"
import { GetUserByEmail } from "../../../../services/user.ts"
import config from "../../../../../config.json" with { type: "json" };
import { CheckPassword, PasswordInfo } from "@openwave/password";
import crypto from "node:crypto"
import { fb_users, fb_emailmapping } from "../../../../firebase.ts"
import argon2 from "argon2"
import Cookie from "../../../../Cookie.ts";

export default {
    method: "POST",
    schema: authBodySchema,
    handler
} satisfies ApiRoute

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const {email, password} = request.body as AuthBody

    // Check #1: Email already registered
    if (await GetUserByEmail(email)) {
        return {success: false, "code": "EMAIL_ALREADY_REGISTERED"}
    }

    // Check #2: Password check
    const result = CheckPassword(password, config.password)
    if (result.status != PasswordInfo.GOOD) {
        return {success: false, "code": "PASSWORD_POLICY_FAILED", result}
    }

    // Final: Register
    const uid = crypto.randomUUID()

    await fb_users.doc(uid).set({
        email,
        passwordHash: await argon2.hash(password),
        createdAt: Date.now(),
        isAdmin: false
    })

    await fb_emailmapping.doc(email).set({
        uid
    })

    // Final: Set user id into cookie
    new Cookie(reply).setCookie(
        reply.server.jwt.sign(
            {
                sub: uid,
            },
            {
                expiresIn: "7d"
            }
        )
    )

    return {success: true}
}