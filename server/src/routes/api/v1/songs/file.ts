import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

export default {
    method: "POST",
    url: "/api/v1/data/songs/file",
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    
}