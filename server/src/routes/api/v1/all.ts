import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../middleware/auth.ts"
import { fb_songs } from "../../../firebase.ts"

export default {
    method: "GET",
    url: "/api/v1/data/songs/all",
    handler,
    onRequest: auth
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const snapshot = await fb_songs.get()

    const songs = snapshot.docs.map(doc => ({key: doc.id, ...doc.data()}))

    return reply.send(songs)
}