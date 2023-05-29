import { env } from "@/env.mjs"
import { ITrack } from "@/types/chartTrack"
import { ISearchResultResponse } from "@/types/searchResponse"
import { readFileSync } from "fs"
export const getSearchResults = async ({
    term,
    offset = 0,
    limit = 20,
}: {
    term: string
    offset?: number
    limit?: number
}) => {
    const resp: ISearchResultResponse = JSON.parse(
        readFileSync(
            "/home/immo/Documents/Coding/frontend-assignment/responses/search.json",
            "utf8"
        )
    )

    return resp.tracks.hits.map(h => h.track)

    const url = new URL("https://shazam.p.rapidapi.com/search")

    const params = new URLSearchParams({
        term,
        offset: offset.toString(),
        limit: limit.toString(),
        locale: "en-US",
    })

    url.search = params.toString()

    const headers = {
        "X-RapidAPI-Key": env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": env.RapidAPI_HOST,
    }

    try {
        const response: ISearchResultResponse = await fetch(url, {
            next: { revalidate: 36000 },
            method: "GET",
            headers,
        }).then(res => res.json())
        return response.tracks.hits.map(h => h.track)
    } catch (err) {
        console.error(err)
    }
}
