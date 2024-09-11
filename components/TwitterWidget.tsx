import { useState } from "react";
import GradientBorder from "./GradientBorder";



export default function TwitterWidget({ username, onClick }: { username: string; onClick: () => any; }) {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <GradientBorder>
            <div className="flex flex-row justify-center items-center gap-2 p-4 relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => hover ? onClick() : null}>
                {hover && <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black rounded-lg hover:cursor-pointer">Delete</div>}
                <img src="/x.png" className="w-5 aspect-square" />
                <p>{username}</p>
            </div>
        </GradientBorder>
    );
}