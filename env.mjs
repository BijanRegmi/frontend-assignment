// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    server: {
        RAPIDAPI_KEY: z.string(),
        RapidAPI_HOST: z.string(),
    },
    client: {
        DEMO: z.preprocess(v => v == "true", z.boolean()),
    },
    runtimeEnv: {
        RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
        RapidAPI_HOST: process.env.RapidAPI_HOST,
        DEMO: process.env.DEMO,
    },
})
