import { useEffect, useState } from "react"

export default function Results() {
    const [starterPrizes, setStarterPrizes] = useState([]);
    const [consolationPrizes, setConsolationPrizes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const results = await fetch("https://teletext-server.vercel.app/latest");
            const resultsJson = await results.json();
        
            setStarterPrizes(resultsJson.starter);
            setConsolationPrizes(resultsJson.consolation);
            setLoading(false);
        };
        fetchData().catch(console.error);
    }, []);

    return !loading && (
        <div className="p-4">
            <div>
                <div>Starters</div>
                <div className="text-right">
                    <div className="space-x-14">
                        {starterPrizes.slice(0, 5).map((draw, id) => {
                            return <span key={id}>{draw} </span>;
                        })}
                    </div>
                    <div className="space-x-14">
                        {starterPrizes.slice(5).map((draw, id) => {
                            return <span key={id}>{draw} </span>;
                        })}
                    </div>
                </div>
            </div>
            <div className="text-cyan-300">
                <div>{!loading && "Consolation:"}</div>
                <div className="text-right">
                    <div className="space-x-14">
                        {consolationPrizes.slice(0, 5).map((draw, id) => {
                            return <span key={id}>{draw} </span>;
                        })}
                    </div>
                    <div className="space-x-14">
                        {consolationPrizes.slice(5).map((draw, id) => {
                            return <span key={id}>{draw} </span>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}