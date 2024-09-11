import { useState } from "react";

export default function CopyText({ text, copy }: { text: string; copy: string; }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const handleCopy = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(copy);
        }
    };

    return (
        <div className="relative flex items-center">
            <p className="cursor-pointer" onClick={handleCopy} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {text}
            </p>
            {showTooltip && (
                <p className="absolute text-center text-nowrap  z-50 left-[75%] top-4 ml-2 text-sm bg-primary px-2 py-1 rounded">
                    Click to copy
                </p>
            )}
        </div>
    );
};