"use client"

import { useRecoilState } from "recoil"
import { chartFilterState } from "./state"
import { Fragment, useEffect, useState } from "react"
import { ChartList } from "@/types/chartList"
import { trpc } from "./TrpcContext"
import { TrackCard } from "./Track"
import { useObserverRef } from "@/lib/useObserver"

export const Charts = ({ chartList }: { chartList: ChartList }) => {
    const [state, _setState] = useRecoilState(chartFilterState)
    const [id, setId] = useState("")

    useEffect(() => {
        const country = chartList.countries[state.countryIdx]
        const listId =
            country?.cities[state.cityIdx]?.listid ||
            country?.genres[state.genreIdx]?.listid ||
            country?.listid ||
            chartList.global.genres[state.genreIdx]?.listid ||
            ""
        setId(listId)
    }, [state, chartList])

    const {
        data,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = trpc.getTracks.useInfiniteQuery(
        { listId: id },
        { getNextPageParam: lastPage => lastPage.nextCursor }
    )

    const observerRef = useObserverRef<HTMLDivElement>({
        onIntersect: () => {
            if (hasNextPage) fetchNextPage()
        },
    })

    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fill,13rem)] gap-x-4 gap-y-6 items-center justify-between py-3 w-full mt-4">
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
                    : "Thats all we have :)"}
            </div>
        </>
    )
}
