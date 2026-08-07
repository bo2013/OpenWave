import type { FastifyReply } from "fastify"
import type { CookieSerializeOptions } from "@fastify/cookie"

export default class Cookie {
    reply: FastifyReply
    cookieConfig: CookieSerializeOptions = {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    }

    constructor(reply: FastifyReply) {
        this.reply = reply
    }

    setCookie(value: string) {
        this.reply.setCookie("token", value, this.cookieConfig)
    }

    clear() {
        this.reply.clearCookie("token", this.cookieConfig)
    }
}