import type { FastifySchema } from "fastify"

export const authBodySchema: FastifySchema = {
    body: {
        type: "object",
        additionalProperties: false,
        required: [
            "email",
            "password"
        ],
        properties: {
            email: {
                type: "string"
            },
            password: {
                type: "string"
            }
        }
    }
}