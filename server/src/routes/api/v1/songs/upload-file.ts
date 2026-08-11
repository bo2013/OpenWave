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
    // TODO: Nhận multipart từ admin và lưu file vào __dirname/assets/songs/<uuid>, dùng node:crypto để random uuid
}