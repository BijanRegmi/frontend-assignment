import { TrackCard } from "@/components/Track"
import { chartsTrack } from "@/lib/chartsTrack"
import { notFound } from "next/navigation"

export const revalidate = 3600

export default async function Home() {
    const response = await chartsTrack({})

    if (!response) return notFound()

    return (
        <div className="flex gap-4 flex-wrap ">
            {response.tracks.map(t => (
                <TrackCard key={t.key} track={t} />
            ))}
        </div>
    )
}
