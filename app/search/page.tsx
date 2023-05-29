import { SearchResult } from "@/components/SearchResults"
import { getSearchResults } from "@/lib/searchTrack"
import { redirect } from "next/navigation"

const SearchPage = async ({
    searchParams,
}: {
    searchParams: { q?: string }
}) => {
    if (!searchParams.q) redirect("/")

    const response = await getSearchResults({ term: searchParams.q })

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
