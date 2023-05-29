import { redirect } from "next/navigation"

const TrackPage = ({ searchParams }: { searchParams: { id?: string } }) => {
    if (!searchParams.id) redirect("/")
    return <div>{searchParams.id}</div>
}

export default TrackPage
