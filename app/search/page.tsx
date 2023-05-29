import { SearchResult } from "@/components/SearchResults"
import { API } from "@/lib/Api"
import { ISearchResultResponse } from "@/types/searchResponse"
import { notFound, redirect } from "next/navigation"

const SearchPage = async ({
    searchParams,
}: {
    searchParams: { q?: string }
}) => {
    if (!searchParams.q) redirect("/")

    const response = await API<ISearchResultResponse>({
        endpoint: "/search",
        demo: true,
        filepath: "responses/search.json",
        params: {
            term: searchParams.q,
        },
    }).then(res => res?.tracks.hits.map(h => h.track))
    if (!response) return notFound()

    return (
        <div className="h-full w-full p-4 max-h-full overflow-scroll">
            <div className="text-xl font-semibold">
                Search results for {searchParams.q}
            </div>
            <SearchResult term={searchParams.q} tracks={response} />
        </div>
    )
}

export default SearchPage
