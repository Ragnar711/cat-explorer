import { CatImage, Breed } from "@/types/cat";

const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY;
const API_URL = "https://api.thecatapi.com/v1";

export const fetchRandomCat = async (): Promise<CatImage> => {
    const response = await fetch(`${API_URL}/images/search?has_breeds=1`, {
        headers: { "x-api-key": API_KEY ?? "" },
    });
    const [data] = await response.json();
    return data;
};

export const fetchBreedById = async (breedId: string): Promise<Breed> => {
    const response = await fetch(`${API_URL}/breeds/${breedId}`, {
        headers: { "x-api-key": API_KEY ?? "" },
    });
    return response.json();
};

export async function getBreeds(): Promise<Breed[]> {
    const res = await fetch("https://api.thecatapi.com/v1/breeds", {
        headers: {
            "x-api-key": process.env.CAT_API_KEY ?? "",
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!res.ok) throw new Error("Failed to fetch breeds");
    return res.json();
}
