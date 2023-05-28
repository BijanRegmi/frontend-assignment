import { env } from "@/env.mjs"
import { ISearchResponse } from "@/types/searchResponse"

export const searchAutoComplete = async ({ term }: { term: string }) => {
    const url = new URL("https://shazam.p.rapidapi.com/auto-complete")

    const params = new URLSearchParams({
        term: term,
        locale: "en-US",
    })

    url.search = params.toString()

    const headers = {
        "X-RapidAPI-Key": env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": env.RapidAPI_HOST,
    }

    try {
        const response: ISearchResponse = await fetch(url, {
            method: "GET",
            headers,
        }).then(res => res.json())
        return response
    } catch (err) {
        console.error(err)
    }
}
