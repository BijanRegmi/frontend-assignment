import { env } from "@/env.mjs"
import { ChartList } from "@/types/chartList"
import { readFileSync } from "fs"

export const chartList = async () => {
    const resp: ChartList = JSON.parse(
        readFileSync(
            "/home/immo/Documents/Coding/frontend-assignment/responses/charts_list.json",
            "utf8"
        )
    )
    return resp
    const url = new URL("https://shazam.p.rapidapi.com/charts/list")

    const headers = {
        "X-RapidAPI-Key": env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": env.RapidAPI_HOST,
    }

    try {
        const response: ChartList = await fetch(url, {
            next: { revalidate: 14000 },
            method: "GET",
            headers,
        }).then(res => res.json())
        return response
    } catch (err) {
        console.error(err)
    }
}
