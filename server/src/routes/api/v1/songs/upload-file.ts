import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"

export default {
    method: "POST",
    url: "/api/v1/data/songs/file",
    onRequest: auth,
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    
}