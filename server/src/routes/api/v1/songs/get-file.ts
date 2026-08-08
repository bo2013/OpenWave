import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"
import { createReadStream } from "node:fs";

export default {
    method: "GET",
    url: "/api/v1/songs/file/:uuid",
    onRequest: auth,
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    
}