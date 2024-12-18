import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cat Explorer",
    description: "Explore and learn about different cat breeds",
};

export default function RootLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-gray-50">
                    <nav className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Cat Explorer
                            </h1>
                        </div>
                    </nav>
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
