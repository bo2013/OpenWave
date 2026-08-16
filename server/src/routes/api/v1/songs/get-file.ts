import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"
import { createReadStream, existsSync } from "node:fs";
import { open } from "node:fs/promises"
import { __dirname } from "../../../../paths.ts"
import path from "node:path";
import { fileTypeFromBuffer } from "file-type";

export default {
    method: "GET",
    url: "/api/v1/songs/file/:uuid",
    onRequest: auth,
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const { uuid } = request.params as { uuid: string };

    const filePath = path.join(__dirname, "..", "assets", "songs", uuid);

    if (!existsSync(filePath)) {
        return reply.code(404).send({ success: false, code: "FILE_NOT_FOUND" });
    }

    const file = await open(filePath)

    try {
        const buffer = Buffer.alloc(4100)
        const { bytesRead } = await file.read(buffer, 0, buffer.length, 0)
        const fileType = await fileTypeFromBuffer(buffer.subarray(0, bytesRead))

        if (!fileType) {
            return reply.code(415).send({ success: false, code: "UNKNOWN_FILE_TYPE" });
        }

        return reply
            .type(fileType.mime)
            .send(createReadStream(filePath));
    } finally {
        await file.close()
    }
}