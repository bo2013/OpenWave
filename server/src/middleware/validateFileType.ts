import type { FastifyRequest, FastifyReply } from "fastify";
import { fileTypeFromBuffer } from "file-type";
import { open } from "node:fs/promises";

