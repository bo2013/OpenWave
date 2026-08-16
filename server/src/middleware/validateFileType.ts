import { fileTypeFromBuffer, type FileTypeResult } from "file-type"
import { open } from "node:fs/promises"

const SAMPLE_SIZE = 4100

export async function validateFileType(filePath: string): Promise<FileTypeResult | null> {
    const file = await open(filePath, "r")

    try {
        const buffer = Buffer.alloc(SAMPLE_SIZE)
        const { bytesRead } = await file.read(buffer, 0, SAMPLE_SIZE, 0)
        const fileType = await fileTypeFromBuffer(buffer.subarray(0, bytesRead))

        if (!fileType || !fileType.mime.startsWith("audio/")) {
            return null
        }

        return fileType
    } finally {
        await file.close()
    }
}
