"use client";

import { useState } from "react";
import { BreedSelector } from "./BreedSelector";
import { ComparisonCard } from "./ComparisonCard";
import type { Breed } from "@/types/cat";

interface BreedComparisonProps {
    readonly breeds: Breed[];
}

export default function BreedComparison({ breeds }: BreedComparisonProps) {
    const [selectedBreeds, setSelectedBreeds] = useState<Breed[]>([]);

    const addBreed = (breed: Breed) => {
        if (selectedBreeds.length < 3) {
            setSelectedBreeds([...selectedBreeds, breed]);
        }
    };

    const removeBreed = (breedId: string) => {
        setSelectedBreeds(
            selectedBreeds.filter((breed) => breed.id !== breedId)
        );
    };

    return (
        <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Compare Breeds</h2>

            <div className="mb-6">
                <BreedSelector
                    breeds={breeds}
                    onSelect={addBreed}
                    selectedBreeds={selectedBreeds}
                />
                <p className="text-sm text-gray-500 mt-2">
                    Select up to 3 breeds to compare.{" "}
                    {3 - selectedBreeds.length} slots remaining.
                </p>
            </div>

            {selectedBreeds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedBreeds.map((breed) => (
                        <ComparisonCard
                            key={breed.id}
                            breed={breed}
                            onRemove={() => removeBreed(breed.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500">
                        Select breeds above to start comparing
                    </p>
                </div>
            )}
        </section>
    );
}
