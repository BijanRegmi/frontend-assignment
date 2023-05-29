import { ChartFilter } from "@/components/ChartFilter"
import { Charts } from "@/components/Charts"
import { chartList } from "@/lib/chartsList"
import { notFound } from "next/navigation"

export const revalidate = 14000

export default async function Home() {
    const response = await chartList()

    if (!response) return notFound()

    return (
        <div className="h-full w-full p-4 max-h-full overflow-scroll">
            <ChartFilter chartList={response} />
            <Charts chartList={response} />
        </div>
    )
}
