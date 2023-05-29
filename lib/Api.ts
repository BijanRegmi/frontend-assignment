import { env } from "@/env.mjs"
import { readFileSync } from "fs"
import path from "path"

export const API = async <T>({
    endpoint,
    params = {},
    revalidate = 0,
    demo = true,
    filepath = "",
}: {
    endpoint: string
    revalidate?: false | number
    params?: { [key: string]: string }
    demo?: boolean
    filepath?: string
}) => {
    const timeId = `==> ${endpoint}`
    console.time(timeId)

    try {
        if (demo && filepath) {
            const resp: T = JSON.parse(
                readFileSync(path.join(process.cwd(), filepath), "utf8")
            )
            return resp
        }

        const url = new URL(`https://${env.RapidAPI_HOST}${endpoint}`)
        const urlParams = new URLSearchParams(params)
        url.search = urlParams.toString()

        const headers = {
            "X-RapidAPI-Key": env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": env.RapidAPI_HOST,
        }

        const response: T = await fetch(url, {
            next: { revalidate },
            method: "GET",
            headers,
        }).then(async res => {
            if (res.status == 200) return res.json()
            else throw new Error(await res.text())
        })

        return response
    } catch (err) {
        console.error(err)
    } finally {
        console.timeEnd(timeId)
        console.log({ demo, filepath, revalidate, params }, "\n")
    }
}
