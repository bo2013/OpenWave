import type { RouteOptions } from "fastify"

export default {
    method: "GET",
    url: "/api/v1/health",
    handler
} satisfies RouteOptions

async function handler() {
    return { status: "ok" }
}