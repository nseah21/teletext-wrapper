import Image from "next/image";

export default function Header({ date }: { date: string }) {
    const first = 9349;
    const second = 3496;
    const third = 4750;

    const dates = ["Wed, 25 May 2024", "Thu, 26 May 2024"];

    return (
        <div className="flex p-4">
            <div className="bg-huat-red p-4">
                <Image src="/images/logo-hand.svg" alt="Pixelated logo of a yellow hand" width={170} height={170}/>
            </div>
            <div className="bg-blue-700 basis-full">
                <div className="flex">
                    <div className="p-8">
                        <Image src="/images/logo-4d.svg" alt="Pixelated logo of red 4D text" width={200} height={200}/>
                    </div>
                    <div className="bg-jagung-yellow text-huat-red basis-full p-6 justify-content">
                        <ul>
                            This website does not encourage gambling!
                        </ul>
                        <ul>
                            Display results for: 
                            <select className="bg-jagung-yellow pl-4 pt-2">
                                {dates.map((date, id) => {
                                    return <option key={id} value={date}>{date}</option>
                                })}
                            </select>

                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <div className="p-2 pt-3">{date}</div>
                    <div className="pt-4 bg-black text-jagung-yellow space-x-[100px]">
                        <span>1st: {first}</span>
                        <span>2nd: {second}</span>
                        <span>3rd: {third}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}