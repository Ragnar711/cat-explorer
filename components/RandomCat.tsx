"use client";

import { useState, useEffect } from "react";
import type { CatImage } from "@/types/cat";
import { fetchRandomCat } from "@/lib/api";
import Image from "next/image";

export default function RandomCat() {
    const [cat, setCat] = useState<CatImage | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchNewCat = async () => {
        setLoading(true);
        try {
            const newCat = await fetchRandomCat();
            setCat(newCat);
        } catch (error) {
            console.error("Error fetching cat:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchNewCat();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!cat) return <div>No cat found</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Image
                src={cat.url}
                width={cat.width}
                height={cat.height}
                alt={cat.breeds[0]?.name || "Cat"}
                className="w-full rounded-lg shadow-lg"
            />
            {cat.breeds[0] && (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">{cat.breeds[0].name}</h2>
                    <p className="mt-2">
                        <strong>Temperament:</strong>{" "}
                        {cat.breeds[0].temperament}
                    </p>
                    <p>
                        <strong>Origin:</strong> {cat.breeds[0].origin}
                    </p>
                    <p>
                        <strong>Life Span:</strong> {cat.breeds[0].life_span}{" "}
                        years
                    </p>
                </div>
            )}
            <button
                onClick={fetchNewCat}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Get Another Cat
            </button>
        </div>
    );
}
