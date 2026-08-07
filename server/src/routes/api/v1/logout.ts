import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"
import Cookie from "../../../Cookie.ts"

export default {
    method: "POST",
    url: "/api/v1/auth/logout",
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    new Cookie(reply).clear()
    return { success: true }
}