import { env } from "@/env.mjs"
import { ITrack } from "@/types/chartTrack"
export const chartsTrack = async ({
    listId,
    pageSize = 20,
    startFrom = 0,
}: {
    listId?: string
    pageSize?: number
    startFrom?: number
}) => {
    const url = new URL("https://shazam.p.rapidapi.com/charts/track")

    const params = new URLSearchParams({
        pageSize: pageSize.toString(),
        startFrom: startFrom.toString(),
        locale: "en-US",
    })
    if (listId) params.set("listId", listId)

    url.search = params.toString()

    const headers = {
        "X-RapidAPI-Key": env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": env.RapidAPI_HOST,
    }

    try {
        const response: { properties: {}; tracks: ITrack[] } = await fetch(
            url,
            {
                next: { revalidate: 36000 },
                method: "GET",
                headers,
            }
        ).then(res => res.json())
        return response
    } catch (err) {
        console.error(err)
    }
}
