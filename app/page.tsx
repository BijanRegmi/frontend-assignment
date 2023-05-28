import { ChartFilter } from "@/components/ChartFilter"
import { chartList } from "@/lib/chartsList"
import { notFound } from "next/navigation"

export const revalidate = 14000

export default async function Home() {
    const response = await chartList()

    if (!response) return notFound()

    return (
        <div className="h-full w-full p-4">
            <ChartFilter chartList={response} />
        </div>
    )
}
