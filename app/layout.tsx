import { Header } from "@/components/Header"
import "./globals.css"
import { Inter } from "next/font/google"
import { TrpcProvider } from "@/components/TrpcContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TrpcProvider>
                    <Header />
                    {children}
                </TrpcProvider>
            </body>
        </html>
    )
}
