import type { Metadata } from 'next'
import './globals.css'
import { AppContext } from './AppContext'

export const metadata: Metadata = {
    title: 'Shape Game',
    description: 'Which shape has a bigger volume?',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <AppContext>{children}</AppContext>
            </body>
        </html>
    )
}
