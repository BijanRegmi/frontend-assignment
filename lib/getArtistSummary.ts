import { env } from "@/env.mjs"
import { ArtistSummary } from "@/types/ArtistSummary"
import { readFileSync } from "fs"
export const getArtistSummary = async ({ id }: { id: string }) => {
    const resp: ArtistSummary = JSON.parse(
        readFileSync(
            "/home/immo/Documents/Coding/frontend-assignment/responses/artistSummary.json",
            "utf8"
        )
    ).resources

    return resp

    const url = new URL("https://shazam.p.rapidapi.com/artists/get-summary")

    const params = new URLSearchParams({
        id,
        locale: "en-US",
    })

    url.search = params.toString()

    const headers = {
        "X-RapidAPI-Key": env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": env.RapidAPI_HOST,
    }

    try {
        const response: ArtistSummary = await fetch(url, {
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
