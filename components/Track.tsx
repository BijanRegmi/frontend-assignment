import { formatString } from "@/lib/utils"
import Image from "next/image"
import { ITrack } from "@/types/chartTrack"

export const TrackCard = ({ track }: { track: ITrack }) => {
    return (
        <div className="p-4 bg-shade-800 rounded-lg w-48 aspect-square cursor-pointer">
            <div
                className="rounded-md w-full aspect-square relative hover:scale-[1.02]"
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
                    className="font-semibold text-lg text-white truncate"
                    title={track.title}
                >
                    {track.title}
                </h1>
                {track.artists != undefined &&
                    (() => {
                        const arts = track.artists.filter(
                            a => a.alias != undefined
                        )
                        const str = arts.map(a => a.alias).join(", ")
                        return (
                            <h2
                                className="text-shade-100 truncate w-full"
                                title={str}
                            >
                                {str}
                            </h2>
                        )
                    })()}
            </div>
        </div>
    )
}
