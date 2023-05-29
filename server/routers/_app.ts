import { searchAutoComplete } from "@/lib/searchAutoComplete"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { ISearchResponse } from "@/types/searchResponse"
import { getChartTracks } from "@/lib/chartsTrack"
import { ITrack } from "@/types/chartTrack"
import { getSearchResults } from "@/lib/searchTrack"

export const appRouter = router({
    autocomplete: publicProcedure
        .input(z.object({ term: z.string() }))
        .mutation(async ({ input }) => {
            const { term } = input

            if (true) {
                const sample: ISearchResponse = {
                    hints: [
                        { term: "kiss the girl" },
                        { term: "kiss the girl brent morgan" },
                        { term: "kiss the rain" },
                        { term: "kiss the sky" },
                        { term: "kiss the girl wedding" },
                        { term: "kiss the bride" },
                        { term: "kiss the ring" },
                        { term: "kiss the sky presented by paul hardcastle" },
                        { term: "kiss the anus of a black cat" },
                        { term: "kiss the tiger" },
                    ],
                }
                return sample
            } else {
                const response = await searchAutoComplete({ term })

                if (!response)
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                    })
                return response
            }
        }),

    getTracks: publicProcedure
        .input(
            z.object({
                listId: z.string(),
                cursor: z.number().nullish(),
            })
        )
        .query(
            async ({
                input,
            }): Promise<{
                tracks: ITrack[]
                nextCursor: number | undefined
            }> => {
                const LIMIT = 20

                const tracks = await getChartTracks({
                    listId: input.listId,
                    pageSize: LIMIT,
                    startFrom: input.cursor || 0,
                })

                const nextCursor =
                    tracks.length < LIMIT
                        ? undefined
                        : tracks.length + (input.cursor || 0)

                return { tracks, nextCursor }
            }
        ),

    getSearchResults: publicProcedure
        .input(
            z.object({
                term: z.string(),
                prefetched: z.number().default(0),
                cursor: z.number().nullish(),
            })
        )
        .query(async ({ input }) => {
            const LIMIT = 20

            const tracks = await getSearchResults({
                term: input.term,
                limit: LIMIT,
                offset: (input.cursor || 0) + input.prefetched,
            })

            const nextCursor =
                tracks.length < LIMIT
                    ? undefined
                    : tracks.length + (input.cursor || 0)

            return { tracks, nextCursor }
        }),
})

export type AppRouter = typeof appRouter
