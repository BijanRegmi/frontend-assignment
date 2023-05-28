import Image from "next/image"
import Link from "next/link"
import { SearchBar } from "./SearchBar"

export const Header = () => {
    return (
        <div className="h-16 bg-white border-b border-black flex flex-row justify-between">
            <section className="ml-4 flex items-center">
                <Link
                    href="/"
                    className="rounded-md h-full aspect-square relative hover:scale-[1.02]"
                >
                    <Image
                        src="/icon-a.png"
                        alt="SiteIcon"
                        fill
                        className="w-full aspect-square rounded-md"
                    />
                </Link>
                <h1 className="lowercase text-2xl font-semibold">Sangeet</h1>
            </section>
            <section className="mr-4 h-full flex items-center gap-2">
                <SearchBar />
                <span className="bg-shade-900 px-4 text-white h-8 inline-flex items-center rounded-md">
                    SignIn
                </span>
            </section>
        </div>
    )
}
