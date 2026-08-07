import type { FastifyRequest, RouteOptions } from "fastify";

import { auth } from "../../../middleware/auth.ts";
import { GetUserByUUID } from "../../../services/user.ts";

export default {
  method: "GET",
  url: "/api/v1/auth/me",
  handler,
  preHandler: auth,
} satisfies RouteOptions;

async function handler(request: FastifyRequest) {
  const uid = request.user.sub;

  const user = await GetUserByUUID(uid);

  if (!user) {
    return {
      success: false,
      code: "USER_NOT_FOUND",
    };
  }

  const { passwordHash: _passwordHash, ...safeUser } = user;

  return {
    success: true,
    user: {
      ...safeUser,
    },
  };
}
