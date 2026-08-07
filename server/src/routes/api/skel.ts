import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

export default {
    method: "POST",
    url: "/api/skel",
    handler
} satisfies RouteOptions

// Must remove 2 line of this comment
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handler(request: FastifyRequest, reply: FastifyReply) {
    
}