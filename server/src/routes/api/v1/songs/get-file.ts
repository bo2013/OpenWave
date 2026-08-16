import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"
import { createReadStream, existsSync } from "node:fs";
import { __dirname } from "../../../../paths.ts"
import path from "node:path";
import { fileTypeFromStream } from "file-type";

export default {
    method: "GET",
    url: "/api/v1/songs/file/:uuid",
    onRequest: auth,
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const { uuid } = request.params as { uuid: string };

    const filePath = path.join(__dirname, "assets", "songs", uuid);

    if (!existsSync(filePath)) {
        return reply.code(404).send({ success: false, code: "FILE_NOT_FOUND" });
    }

    const stream = createReadStream(filePath);
    const fileType = await fileTypeFromStream(stream);

    if (!fileType) {
        stream.destroy();
        return reply.code(415).send({ success: false, code: "UNKNOWN_FILE_TYPE" });
    }

    return reply
        .type(fileType.mime)
        .send(stream);
}