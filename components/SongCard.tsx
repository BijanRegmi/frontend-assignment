import { formatString } from "@/lib/utils"
import { ArtistSummary } from "@/types/ArtistSummary"
import Image from "next/image"
import { AudioPlayer } from "./AudioPlayer"

export const SongCard = ({
    song,
}: {
    song: ArtistSummary["songs"][string]
}) => {
    const genreList = song.attributes.genreNames.map(formatString).join(", ")
    const audioUrl = song.attributes.previews.find(p => !!p.url)?.url
    return (
        <div className="h-20 flex items-center w-full gap-2 shadow-md rounded-md border border-l-0 border-orange-300 hover:border-orange-400 hover:shadow-lg">
            <div className="rounded-l-md h-full aspect-square relative">
                <Image
                    src={song.attributes.artwork.url
                        .replace("{w}", "400")
                        .replace("{h}", "400")}
                    alt="Icon"
                    fill
                    className="w-full aspect-square rounded-l-md"
                />
            </div>
            <div className="cursor-default truncate">
                <h1
                    className="text-xl font-semibold truncate text-primary-300"
                    title={song.attributes.name}
                >
                    {song.attributes.name}
                </h1>
                <h2 className="truncate text-shade-700" title={genreList}>
                    {genreList}
                </h2>
                <h3 className="text-sm text-shade-400 font-semibold">
                    {song.attributes.releaseDate.toString()}
                </h3>
            </div>
            {audioUrl != undefined && (
                <div className="ml-auto h-2/3">
                    <AudioPlayer audioUrl={audioUrl} />
                </div>
            )}
        </div>
    )
}
