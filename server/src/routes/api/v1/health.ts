import type { ApiRoute } from "../../../types"

export default {
    method: "GET",
    handler
} satisfies ApiRoute

async function handler() {
    return { status: "ok" }
}