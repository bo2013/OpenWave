import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"
import { isAdmin } from "../../../../middleware/isAdmin.ts"
import { __dirname } from "../../../../paths.ts"
import { randomUUID } from "node:crypto"
import { createWriteStream, mkdirSync } from "node:fs"
import { pipeline } from "node:stream/promises"
import path from "node:path"

export default {
    method: "POST",
    url: "/api/v1/songs/file",
    onRequest: [auth, isAdmin],
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const data = await request.file();

    if (!data) {
        return reply.code(400).send({ success: false, code: "NO_FILE" });
    }

    const uuid = randomUUID();
    const songsDir = path.join(__dirname, "assets", "songs");

    // Tạo thư mục nếu chưa tồn tại
    mkdirSync(songsDir, { recursive: true });

    const filePath = path.join(songsDir, uuid);
    const writeStream = createWriteStream(filePath);

    await pipeline(data.file, writeStream);

    return reply.code(201).send({ success: true, uuid });
}