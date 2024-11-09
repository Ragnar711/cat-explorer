"use client";

import { useState, useEffect } from "react";
import type { CatImage } from "@/types/cat";
import { fetchRandomCat } from "@/lib/api";
import Image from "next/image";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export default function CatOfTheDay() {
    const [catOfDay, setCatOfDay] = useState<CatImage | null>(null);
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");

    useEffect(() => {
        const loadCatOfDay = async () => {
            const storedCat = localStorage.getItem("catOfDay");
            const storedDate = localStorage.getItem("catOfDayDate");
            const today = new Date().toISOString().split("T")[0];

            if (storedCat && storedDate === today) {
                setCatOfDay(JSON.parse(storedCat));
            } else {
                const cat = await fetchRandomCat();
                setCatOfDay(cat);
                localStorage.setItem("catOfDay", JSON.stringify(cat));
                localStorage.setItem("catOfDayDate", today);
            }
        };
        loadCatOfDay();
    }, []);

    const handleChat = async () => {
        if (!catOfDay) return;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a cat of breed ${catOfDay.breeds[0].name} with a temperament of ${catOfDay.breeds[0].temperament}.`,
                },
                { role: "user", content: userMessage },
            ],
        });

        const message = response.choices[0].message?.content ?? "No response";
        setChatMessages([
            ...chatMessages,
            `User: ${userMessage}`,
            `Cat: ${message}`,
        ]);
        setUserMessage("");
    };

    if (!catOfDay) return <div>Loading Cat of the Day...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Cat of the Day</h2>
            <Image
                src={catOfDay.url}
                alt={catOfDay.breeds[0].name}
                width={500}
                height={500}
                className="mb-4"
            />
            <div className="mb-4">
                <h3 className="text-xl font-semibold">
                    {catOfDay.breeds[0].name}
                </h3>
                <p>{catOfDay.breeds[0].temperament}</p>
            </div>
            <div className="mb-4">
                <textarea
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask the cat something..."
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleChat}
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                    Chat with the Cat
                </button>
            </div>
            <div className="mt-4">
                {chatMessages.map((msg) => (
                    <p key={msg}>{msg}</p>
                ))}
            </div>
        </div>
    );
}
