import { formatString } from "@/lib/utils"
import Image from "next/image"
import { ITrack } from ".."

export const TrackCard = ({ track }: { track: ITrack }) => {
    return (
        <div className="p-4 bg-shade-800 rounded-lg w-48 aspect-square cursor-pointer">
            <div
                className="rounded-md w-full aspect-square relative hover:scale-[1.02]"
                id="image"
            >
                <Image
                    src={track.images.background}
                    alt={track.title}
                    fill
                    className="w-full aspect-square rounded-md"
                />
            </div>
            <div className="mt-2 w-full">
                <h1
                    className="font-semibold text-lg text-white truncate"
                    title={track.title}
                >
                    {track.title}
                </h1>
                <h2
                    className="text-shade-100 truncate w-full"
                    title={track.artists
                        .map(a => formatString(a.alias))
                        .join(", ")}
                >
                    {track.artists.map(a => formatString(a.alias)).join(", ")}
                </h2>
            </div>
        </div>
    )
}
