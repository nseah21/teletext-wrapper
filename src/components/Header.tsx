import Image from "next/image";
import { sql } from "@vercel/postgres";
import { useEffect, useState } from "react";
import { metadata } from "@/app/layout";

type MetadataEntry = {
    date: string,
    id: string
}

export default function Header() {
    const [currentDrawId, setCurrentDrawId] = useState("");
    const [firstPrize, setFirstPrize] = useState("");
    const [secondPrize, setSecondPrize] = useState("");
    const [thirdPrize, setThirdPrize] = useState("");
    const [drawDate, setDrawDate] = useState("")
    const [metadata, setMetadata] = useState<MetadataEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const handleLoadNewResults = async (event: React.MouseEvent<HTMLSelectElement>) => {
        const drawId = event.currentTarget.value;
        if (drawId == currentDrawId) {
            return;
        }

        setLoading(true);

        const newResults = await fetch(`https://teletext-server.vercel.app/draws/${drawId}`);
        const newResultsJson = await newResults.json();

        setCurrentDrawId(newResultsJson.id);
        setFirstPrize(newResultsJson.first);
        setSecondPrize(newResultsJson.second);
        setThirdPrize(newResultsJson.third);
        setDrawDate(newResultsJson.date);
        setLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            const latestDraw = await fetch("https://teletext-server.vercel.app/latest");
            const metadata = await fetch("https://teletext-server.vercel.app/metadata");
            const latestDrawJson = await latestDraw.json();
            const metadataJson = await metadata.json();

            setCurrentDrawId(latestDrawJson.id);
            setFirstPrize(latestDrawJson.first);
            setSecondPrize(latestDrawJson.second);
            setThirdPrize(latestDrawJson.third);
            setDrawDate(latestDrawJson.date);
            setMetadata(metadataJson);
            setLoading(false);
        };

        fetchData().catch(console.error);
    }, []);

    return (
        <div className="flex p-4">
            <div className="bg-huat-red p-4">
                <Image src="/images/logo-hand.svg" alt="Pixelated logo of a yellow hand" width={170} height={170} />
            </div>
            <div className="bg-blue-700 basis-full">
                <div className="flex">
                    <div className="p-8">
                        <Image src="/images/logo-4d.svg" alt="Pixelated logo of red 4D text" width={200} height={200} />
                    </div>
                    <div className="bg-jagung-yellow text-huat-red basis-full p-6 justify-content">
                        <ul>
                            This website does not encourage gambling!
                        </ul>
                        <ul>
                            Display results for:
                            <select onClick={handleLoadNewResults} className="bg-jagung-yellow pl-4 pt-2">
                                {
                                    metadata.map((entry, id) => {
                                        return <option key={id} value={entry.id}>{entry.date}</option>
                                    })
                                }
                            </select>

                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <div className="p-2 pt-3">{loading ? "Loading..." : drawDate}</div>
                    <div className="pt-4 bg-black text-jagung-yellow space-x-[100px]">
                        <span>{!loading && `1st: ${firstPrize}`}</span>
                        <span>{!loading && `2nd: ${secondPrize}`}</span>
                        <span>{!loading && `3rd: ${thirdPrize}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

