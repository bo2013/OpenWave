import type { FastifyRequest, FastifyReply, RouteOptions } from "fastify"

import { auth } from "../../../../middleware/auth.ts"
import { fb_songs } from "../../../../firebase.ts"

type SongDoc = {
    name: string
    image: string
    artists: {
        id: string
        name: string
    }[]
}

export default {
    method: "GET",
    url: "/api/v1/songs/all",
    handler,
    onRequest: auth
} satisfies RouteOptions

async function handler(request: FastifyRequest, reply: FastifyReply) {
    const snapshot = await fb_songs.get<SongDoc>()

    const songs = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        artists: doc.data().artists
    }))

    return reply.send(songs)
}