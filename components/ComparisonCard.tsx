import type { Breed } from "@/types/cat";
import Image from "next/image";

interface ComparisonCardProps {
    readonly breed: Breed;
    readonly onRemove: () => void;
}

export function ComparisonCard({ breed, onRemove }: ComparisonCardProps) {
    const imageSrc = `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{breed.name}</h3>
                <button
                    onClick={onRemove}
                    className="text-gray-400 hover:text-gray-600"
                >
                    ×
                </button>
            </div>

            <Image
                src={imageSrc}
                width={300}
                height={300}
                alt={breed.name}
                className="w-full h-48 object-cover rounded-lg mt-4"
            />

            <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                <div className="mb-4">
                    <h4 className="font-medium text-gray-700">Origin</h4>
                    <p className="text-gray-600">{breed.origin}</p>
                </div>

                <div className="mb-4">
                    <h4 className="font-medium text-gray-700">Temperament</h4>
                    <p className="text-gray-600">{breed.temperament}</p>
                </div>

                <div className="mb-4">
                    <h4 className="font-medium text-gray-700">Life Span</h4>
                    <p className="text-gray-600">{breed.life_span} years</p>
                </div>

                <div className="mb-4">
                    <h4 className="font-medium text-gray-700">Weight</h4>
                    <p className="text-gray-600">{breed.weight.metric} kg</p>
                </div>

                <a
                    href={breed.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline inline-block mt-2"
                >
                    Learn More
                </a>
            </div>
        </div>
    );
}
