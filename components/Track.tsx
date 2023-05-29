import { formatArtistName } from "@/lib/utils"
import Image from "next/image"
import { ITrack } from "@/types/chartTrack"
import Link from "next/link"

export const TrackCard = ({ track }: { track: ITrack }) => {
    return (
        <Link
            href={`/track?${new URLSearchParams({ id: track.key }).toString()}`}
            className="p-4  border border-orange-400 rounded-md shadow-lg w-48 aspect-square cursor-pointer hover:scale-[1.02] hover:shadow-lg"
        >
            <div
                className="rounded-md w-full aspect-square relative "
                id="image"
            >
                <Image
                    src={
                        track.images?.background ||
                        "https://discussions.apple.com/content/attachment/592590040"
                    }
                    alt={track.title}
                    fill
                    className="w-full aspect-square rounded-md"
                />
            </div>
            <div className="mt-2 w-full">
                <h1
                    className="font-semibold text-lg text-shade-900 truncate"
                    title={track.title}
                >
                    {track.title}
                </h1>
                {track.artists != undefined &&
                    (() => {
                        const arts = track.artists.filter(
                            a => a.alias != undefined
                        )
                        const str = arts
                            .map(a => formatArtistName(a.alias))
                            .join(", ")
                        return (
                            <h2
                                className="text-shade-800 truncate w-full"
                                title={str}
                            >
                                {str}
                            </h2>
                        )
                    })()}
            </div>
        </Link>
    )
}
