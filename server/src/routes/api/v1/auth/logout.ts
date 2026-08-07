import type { FastifyRequest, FastifyReply } from "fastify"
import type { ApiRoute } from "../../../../types"
import Cookie from "../../../../Cookie.ts"

export default {
    method: "POST",
    handler
} satisfies ApiRoute

async function handler(request: FastifyRequest, reply: FastifyReply) {
    new Cookie(reply).clear()
    return { success: true }
}