import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"
import { isAdmin } from "../../../../middleware/isAdmin.ts"
import { __dirname } from "../../../../paths.ts"

export default {
    method: "POST",
    url: "/api/v1/songs/file",
    onRequest: [auth, isAdmin],
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const parts = request.parts();

    for await (const part of parts) {
        
    }
}