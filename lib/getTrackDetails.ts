import { env } from "@/env.mjs"
import { TrackDetails } from "@/types/TrackDetails"
import { readFileSync } from "fs"
export const getTrackDetails = async ({ key }: { key: string }) => {
    const resp: TrackDetails = JSON.parse(
        readFileSync(
            "/home/immo/Documents/Coding/frontend-assignment/responses/trackDetails.json",
            "utf8"
        )
    )
    return resp

    const url = new URL("https://shazam.p.rapidapi.com/songs/get-details")

    const params = new URLSearchParams({
        key,
        locale: "en-US",
    })

    url.search = params.toString()

    const headers = {
        "X-RapidAPI-Key": env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": env.RapidAPI_HOST,
    }

    try {
        const response: TrackDetails = await fetch(url, {
            next: { revalidate: 36000 },
            method: "GET",
            headers,
        })
            .then(res => res.json())
            .then(data => data.resources)
        return response
    } catch (err) {
        console.error(err)
    }
}
