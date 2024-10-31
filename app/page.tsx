import RandomCat from "@/components/RandomCat";
import CatOfTheDay from "@/components/CatOfTheDay";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 flex flex-row items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Cat Explorer
                    </h1>
                    <Link
                        href="/compare"
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Compare Cats
                    </Link>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RandomCat />
                    <CatOfTheDay />
                </div>
            </main>
        </div>
    );
}
