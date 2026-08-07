import type { FastifyRequest, FastifyReply } from "fastify"
import type { ApiRoute } from "../../../../../types"

export default {
    method: "POST",
    handler
} satisfies ApiRoute

async function handler(request: FastifyRequest, reply: FastifyReply) {
    return {}
}