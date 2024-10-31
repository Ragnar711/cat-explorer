"use client";

import { useState, useEffect } from "react";
import type { CatImage } from "@/types/cat";
import { fetchRandomCat } from "@/lib/api";
import Image from "next/image";

export default function CatOfTheDay() {
    const [catOfDay, setCatOfDay] = useState<CatImage | null>(null);

    useEffect(() => {
        const loadCatOfDay = async () => {
            // In a real app, you'd want to cache this for 24 hours
            const cat = await fetchRandomCat();
            setCatOfDay(cat);
        };
        loadCatOfDay();
    }, []);

    if (!catOfDay) return <div>Loading Cat of the Day...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Cat of the Day</h2>
            <Image
                src={catOfDay.url}
                width={catOfDay.width}
                height={catOfDay.height}
                alt="Cat of the Day"
                className="w-full rounded-lg shadow-lg"
            />
            {catOfDay.breeds[0] && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">
                        {catOfDay.breeds[0].name}
                    </h3>
                    <p className="mt-2">{catOfDay.breeds[0].temperament}</p>
                    <a
                        href={catOfDay.breeds[0].wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Learn More
                    </a>
                </div>
            )}
        </div>
    );
}
