"use client"

import { useObserverRef } from "@/lib/useObserver"
import { TrackCard } from "./Track"
import { trpc } from "./TrpcContext"
import { ITrack } from "@/types/chartTrack"
import { Fragment } from "react"

export const SearchResult = ({
    term,
    tracks,
}: {
    term: string
    tracks: ITrack[]
}) => {
    const {
        data,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = trpc.getSearchResults.useInfiniteQuery(
        {
            term,
            prefetched: tracks.length,
        },
        {
            getNextPageParam: lastPage => lastPage.nextCursor,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    )

    const observerRef = useObserverRef<HTMLDivElement>({
        onIntersect: () => {
            if (hasNextPage) fetchNextPage()
        },
    })

    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fill,13rem)] gap-x-4 gap-y-6 items-center justify-between py-3 w-full mt-4">
                {tracks.map(track => (
                    <TrackCard key={track.key} track={track} />
                ))}

                {isSuccess &&
                    data?.pages?.map((page, pageIdx) => (
                        <Fragment key={pageIdx}>
                            {page?.tracks?.map(track => (
                                <TrackCard key={track.key} track={track} />
                            ))}
                        </Fragment>
                    ))}
            </div>
            <div ref={observerRef} className="w-full text-center">
                {(isFetchingNextPage && hasNextPage) || isFetching
                    ? "Loading..."
                    : "That's all we have :)"}
            </div>
        </>
    )
}
