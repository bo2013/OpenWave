import type { FastifyReply, FastifyRequest } from "fastify";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch {
        return reply.code(401).send({
            success: false,
            code: "UNAUTHORIZED"
        });
    }
}