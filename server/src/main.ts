// ===============================================
// Import
// ===============================================
import Fastify from "fastify"
import { glob } from "node:fs/promises";

import fastifyStatic from "@fastify/static";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// ===============================================
// Setup
// ===============================================

// --- Paths ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================================
// Fastify
// ===============================================

// --- Fastify ---
const fastify = Fastify({
    logger: true
})

// --- Plugin: Static ---
await fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "public"),
    wildcard: true
});

// --- Plugin: Cookie ---
await fastify.register(fastifyCookie)

// --- Plugin: JWT ---
await fastify.register(fastifyJwt, {
    secret: "tul7F4gpByGojpJYv6VaGjsKm8RXB5ct",

    cookie: {
        cookieName: "token",
        signed: false
    }
})

// ===============================================
// APIs
// ===============================================

// Router loader
const routesDir = path.join(__dirname, "routes")

for await (const file of glob(path.join(routesDir, "**/*.{ts,js}"))) {
    process.stdout.write(pathToFileURL(file).href + ": ")
    const { default: route } = await import(pathToFileURL(file).href)
    console.log(route.method , route.url)
    fastify.route({ ...route })
}

fastify.setNotFoundHandler((request, reply) => {
    if (request.url.startsWith("/api/")) {
        return reply.code(404).send({
            success: false,
            code: "API_NOT_FOUND"
        });
    }
    return reply.sendFile("index.html");
});

const port = 3000

console.log("\nStarting server at port", port)

await fastify.listen({ port })