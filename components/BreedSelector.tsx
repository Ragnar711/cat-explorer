"use client";

import { useState } from "react";
import type { Breed } from "@/types/cat";

interface BreedSelectorProps {
    readonly breeds: Breed[];
    readonly onSelect: (breed: Breed) => void;
    readonly selectedBreeds: Breed[];
}

export function BreedSelector({
    breeds,
    onSelect,
    selectedBreeds,
}: BreedSelectorProps) {
    const [search, setSearch] = useState("");

    const filteredBreeds = breeds.filter(
        (breed) =>
            breed.name.toLowerCase().includes(search.toLowerCase()) &&
            !selectedBreeds.find((selected) => selected.id === breed.id)
    );

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search breeds..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border rounded-md"
            />
            {search && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredBreeds.map((breed) => (
                        <button
                            key={breed.id}
                            onClick={() => {
                                onSelect(breed);
                                setSearch("");
                            }}
                            className="w-full p-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        >
                            {breed.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
