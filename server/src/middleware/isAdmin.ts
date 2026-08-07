import type { FastifyReply, FastifyRequest } from "fastify";

import { GetUserByUUID } from "../services/user.ts";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const user = await GetUserByUUID(request.user.sub);

  if (user?.isAdmin !== true) {
    return reply.code(403).send({
      success: false,
      code: "FORBIDDEN",
    });
  }
}