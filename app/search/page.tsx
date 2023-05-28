import { redirect } from "next/navigation"

const SearchPage = ({ searchParams }: { searchParams: { q?: string } }) => {
    if (!searchParams.q) redirect("/")
    return <div>{searchParams.q}</div>
}

export default SearchPage
