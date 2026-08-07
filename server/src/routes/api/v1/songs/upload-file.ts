import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"
import { isAdmin } from "../../../../middleware/isAdmin.ts"

export default {
    method: "POST",
    url: "/api/v1/data/songs/file",
    onRequest: [auth, isAdmin],
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    
}