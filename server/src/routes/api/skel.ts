import type { FastifyRequest, FastifyReply } from "fastify"
import type { ApiRoute } from "../../types"

export default {
    method: "POST",
    handler
} satisfies ApiRoute

// Must remove 2 line of this comment
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handler(request: FastifyRequest, reply: FastifyReply) {
    
}