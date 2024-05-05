import Image from "next/image";
import { sql } from "@vercel/postgres";
import { useEffect, useState } from "react";
import { metadata } from "@/app/layout";

type MetadataEntry = {
    date: string,
    id: string
}

export default function Header({ firstPrize, secondPrize, thirdPrize, drawDate, metadata }: { firstPrize: string, secondPrize: string, thirdPrize: string, drawDate: string, metadata: MetadataEntry[] }) {
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
                            <select className="bg-jagung-yellow pl-4 pt-2">
                                {
                                    metadata.map((entry, id) => {
                                        return <option key={id} value={entry.date}></option>
                                    })
                                }
                            </select>

                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <div className="p-2 pt-3">{drawDate}</div>
                    <div className="pt-4 bg-black text-jagung-yellow space-x-[100px]">
                        <span>1st: {firstPrize}</span>
                        <span>2nd: {secondPrize}</span>
                        <span>3rd: {thirdPrize}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const latestDraw = await fetch("https://teletext-server.vercel.app/latest");
    const metadata = await fetch("https://teletext-server.vercel.app/metadata");
    
    const latestDrawJson = await latestDraw.json(); 
    const metadataJson = await metadata.json(); 

    return {
        props: {
            firstPrize: latestDrawJson.first,
            secondPrize: latestDrawJson.second,
            thirdPrize: latestDrawJson.third,
            drawDate: latestDrawJson.date,
            metadata: metadataJson
        }
    }

}
