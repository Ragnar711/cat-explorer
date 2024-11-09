import { getBreeds } from "@/lib/api";
import BreedComparison from "@/components/BreedComparison";
import Link from "next/link";

export default async function ComparePage() {
    const breeds = await getBreeds();

    return (
        <div className="space-y-6">
            <Link href="/" className="text-[#26549e] hover:underline">
                ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Breed Comparison</h1>
            <BreedComparison breeds={breeds} />
        </div>
    );
}
