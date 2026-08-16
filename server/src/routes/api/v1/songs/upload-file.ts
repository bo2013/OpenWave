import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"
import { isAdmin } from "../../../../middleware/isAdmin.ts"
import { validateFileType } from "../../../../middleware/validateFileType.ts"
import { __dirname } from "../../../../paths.ts"
import { randomUUID } from "node:crypto"
import { createWriteStream, mkdirSync, rename, unlink } from "node:fs"
import { pipeline } from "node:stream/promises"
import path from "node:path"

export default {
    method: "POST",
    url: "/api/v1/songs/file",
    onRequest: [auth, isAdmin],
    handler
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const data = await request.file()

    if (!data) {
        return reply.code(400).send({ success: false, code: "NO_FILE" })
    }

    const uuid = randomUUID()
    const songsDir = path.join(__dirname, "assets", "songs")

    mkdirSync(songsDir, { recursive: true })

    const tempPath = path.join(songsDir, `${uuid}.tmp`)
    const filePath = path.join(songsDir, uuid)
    const writeStream = createWriteStream(tempPath)

    try {
        await pipeline(data.file, writeStream)

        const fileType = await validateFileType(tempPath)

        if (!fileType) {
            await unlink(tempPath)

            return reply.code(415).send({
                success: false,
                code: "INVALID_FILE_TYPE"
            })
        }

        await rename(tempPath, filePath)

        return reply.code(201).send({
            success: true,
            uuid,
            mimeType: fileType.mime
        })
    } catch (error) {
        await unlink(tempPath).catch(() => {})
        throw error
    }
}