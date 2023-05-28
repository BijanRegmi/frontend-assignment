"use client"

import classNames from "classnames"
import { ChangeEvent, FormEvent, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { trpc } from "./TrpcContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import useOnClickOutside from "@/lib/useClikOutside"

export const SearchBar = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [timeout, settimout] = useState<NodeJS.Timeout | null>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)

        if (e.target.value.length <= 3) return

        if (timeout != null) clearTimeout(timeout)

        // Only fetch after user has stopped typing for 1sec
        let tmout = setTimeout(() => mutate({ term: value }), 1000)

        settimout(tmout)
    }

    const { mutate, isLoading, data } = trpc.autocomplete.useMutation()

    const router = useRouter()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("hello?")
        const params = new URLSearchParams({ q: value })
        router.push("/search?" + params.toString())
    }

    const ref = useOnClickOutside<HTMLFormElement>({
        handler: () => setOpen(false),
    })

    return (
        <form
            className="h-full flex items-center"
            onSubmit={onSubmit}
            ref={ref}
        >
            <AiOutlineSearch
                onClick={() => {
                    setOpen(o => !o)
                }}
                className={classNames(
                    "h-8 w-8 border p-1 border-shade-300 cursor-pointer",
                    { "rounded-l-md": open, "rounded-md": !open }
                )}
            />
            <div className="relative h-8">
                <input
                    className={classNames(
                        "w-0 h-full border-shade-300 rounded-tr-md transition-all outline-none px-2",
                        {
                            "w-64": open,
                            "border-l-0 border": open,
                            "rounded-br-md": data?.hints.length == 0,
                        }
                    )}
                    required
                    onChange={onChange}
                    value={value}
                    type="text"
                />
                {(isLoading || (data && data.hints.length > 0 && open)) && (
                    <div className="absolute top-full left-0 right-0 rounded-b-md max-h-64 border border-shade-300 border-t-0 overflow-scroll bg-white px-2">
                        {isLoading && (
                            <div className="truncate border-b border-shade-200 py-2 cursor-pointer hover:border-shade-700">
                                Loading...
                            </div>
                        )}
                        {data?.hints.map((a, idx) => (
                            <Link
                                href={`/search?${new URLSearchParams({
                                    q: a.term,
                                }).toString()}`}
                                key={idx}
                                className="truncate border-b border-shade-200 py-2 cursor-pointer hover:border-shade-700 block"
                            >
                                {a.term}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </form>
    )
}
