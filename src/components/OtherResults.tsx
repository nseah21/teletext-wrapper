import { useEffect, useState } from "react"

export default function Results() {
    const starter = [1224, 5115, 4461, 7195, 8418, 2827, 7097, 1869, 8242, 2475]
    const consolation = [6073, 4099, 7702, 6991, 7908, 3913, 7185, 2747, 1684, 3276]

    return (
        <div className="p-4">
            <div>
                <div>Starters:</div>
                <div className="text-right">
                    <div className="space-x-14">
                        {starter.slice(0, 5).map((draw, id) => {
                            return <span key={id}>{draw} </span>;
                        })}
                    </div>
                    <div className="space-x-14">
                        {starter.slice(5).map((draw, id) => {
                            return <span key={id}>{draw} </span>;
                        })}
                    </div>
                </div>
            </div>
            <div className="text-cyan-300">
                <div>Consolation:</div>
                <div className="text-right">
                    <div className="space-x-14">
                        {consolation.slice(0, 5).map((draw, id) => {
                            return <span key={id}>{draw} </span>;
                        })}
                    </div>
                    <div className="space-x-14">
                        {consolation.slice(5).map((draw, id) => {
                            return <span key={id}>{draw} </span>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}