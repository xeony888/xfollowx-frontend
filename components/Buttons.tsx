import { useState } from "react";
import { SmallQuestion } from "./Icons";

type ButtonProps = {
    text: string;
    onClick: () => any;
    disabled?: boolean;
    disabledText?: string;
    disabledHoverText?: string;
    questionText?: string;
    onMouseEnter?: (...t: any[]) => void;
    onMouseLeave?: (...t: any[]) => void;
};


export function GreenButton({ text, onClick, disabled, disabledText, disabledHoverText }: ButtonProps) {
    const [hoverButton, setHoverButton] = useState<boolean>(false);
    const onMouseEnterButton = () => {
        setHoverButton(true);
    };
    const onMouseLeaveButton = () => {
        setHoverButton(false);
    };
    if (disabled) {
        return (
            <button
                className="relative w-full cursor-pointer text-white text-base py-2 px-6 bg-gray-500 "
                onClick={onClick}
                style={{ textShadow: "2px 2px 4px gray" }}
            >
                <div className="flex flex-row justify-center items-center absolute -translate-x-[50%] left-[50%] w-[40%] top-0 h-[5px]">
                    <div className="border-t-white translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                    <div className="w-[90%] h-full bg-white"></div>
                    <div className="border-t-white -translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                </div>
                {disabledText || text}
            </button>
        );
    } else {
        return (
            <button
                className="relative w-full cursor-pointer text-white text-base py-2 px-6 bg-green-500 hover:bg-green-400"
                onClick={onClick}
                onMouseEnter={onMouseEnterButton}
                onMouseLeave={onMouseLeaveButton}
                style={{ textShadow: "2px 2px 4px gray" }}
            >
                <div className="flex flex-row justify-center items-center absolute -translate-x-[50%] left-[50%] w-[40%] top-0 h-[5px]">
                    <div className="border-t-white translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                    <div className="w-[90%] h-full bg-white"></div>
                    <div className="border-t-white -translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                </div>
                {hoverButton ? disabledHoverText || text : text}
            </button>
        );
    }
}
export function DeleteButton({ text, onClick, disabled, disabledHoverText, disabledText }: ButtonProps) {
    const [hoverButton, setHoverButton] = useState<boolean>(false);
    const onMouseEnterButton = () => {
        setHoverButton(true);
    };
    const onMouseLeaveButton = () => {
        setHoverButton(false);
    };
    if (disabled) {
        return (
            <button
                className="relative w-full cursor-pointer text-white text-base py-2 px-6 bg-gray-500 "
                onClick={onClick}
                style={{ textShadow: "2px 2px 4px gray" }}
            >
                <div className="flex flex-row justify-center items-center absolute -translate-x-[50%] left-[50%] w-[40%] top-0 h-[5px]">
                    <div className="border-t-white translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                    <div className="w-[90%] h-full bg-white"></div>
                    <div className="border-t-white -translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                </div>
                {disabledText || text}
            </button>
        );
    } else {
        return (
            <button
                className="relative w-full cursor-pointer text-white text-base py-2 px-6 bg-red-500 hover:bg-red-400"
                onClick={onClick}
                onMouseEnter={onMouseEnterButton}
                onMouseLeave={onMouseLeaveButton}
                style={{ textShadow: "2px 2px 4px gray" }}
            >
                <div className="flex flex-row justify-center items-center absolute -translate-x-[50%] left-[50%] w-[40%] top-0 h-[5px]">
                    <div className="border-t-white translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                    <div className="w-[90%] h-full bg-white"></div>
                    <div className="border-t-white -translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                </div>
                {hoverButton ? disabledHoverText || text : text}
            </button>
        );
    }
}

export function Button3({ text, onClick, disabled, disabledText, disabledHoverText, questionText, onMouseEnter, onMouseLeave }: ButtonProps) {
    const [hoverQuestion, setHoverQuestion] = useState<boolean>(false);
    const [hoverButton, setHoverButton] = useState<boolean>(false);
    const onMouseEnterButton = () => {
        setHoverButton(true);
    };
    const onMouseLeaveButton = () => {
        setHoverButton(false);
    };
    const onMouseEnterQuestion = () => {
        setHoverQuestion(true);
    };
    const onMouseLeaveQuestion = () => {
        setHoverQuestion(false);
    };
    if (disabled) {
        return (
            <button
                className="relative w-full cursor-pointer text-white text-base py-2 px-6 bg-gray-500 "
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{ textShadow: "2px 2px 4px gray" }}
            >
                <div className="flex flex-row justify-center items-center absolute -translate-x-[50%] left-[50%] w-[40%] top-0 h-[5px]">
                    <div className="border-t-white translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                    <div className="w-[90%] h-full bg-white"></div>
                    <div className="border-t-white -translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                </div>
                {disabledText || text}
            </button>
        );
    } else {
        return (
            <button
                className="relative w-full cursor-pointer text-white text-base py-2 px-6 bg-primary-dark hover:bg-primary-light"
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{ textShadow: "2px 2px 4px gray" }}
            >
                <div className="flex flex-row justify-center items-center absolute -translate-x-[50%] left-[50%] w-[40%] top-0 h-[5px]">
                    <div className="border-t-white translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                    <div className="w-[90%] h-full bg-white"></div>
                    <div className="border-t-white -translate-x-[50%] border-l-transparent border-r-transparent" style={{ borderLeftWidth: "5px", borderRightWidth: "5px", borderTopWidth: "5px" }}></div>
                </div>
                {text}
            </button>
        );
        // return (
        //     <button
        //         className="w-full cursor-pointer text-white text-base py-2 px-6 text-center transition duration-200 ease-in-out 
        //     shadow-[inset_0px_-3px_7px_0px_rgba(250,204,21,1)] 
        //     bg-gradient-to-b from-secondary-dark to-primary-dark 
        //     rounded-[3px]
        //     hover:bg-gradient-to-b hover:from-primary-dark hover:to-secondary-dark 
        //     active:brightness-90
        //     text-shadow-[0px_1px_0px_rgba(102,54,38,1)] relative"
        //         onClick={onClick}
        //         onMouseEnter={onMouseEnter}
        //         onMouseLeave={onMouseLeave}
        //     >
        //         {text}
        //         {questionText &&
        //             <div className="absolute right-0 top-0 h-full w-6 flex items-center justify-center mr-2" onMouseEnter={onMouseEnterQuestion} onMouseLeave={onMouseLeaveQuestion}>
        //                 <SmallQuestion />
        //             </div>
        //         }
        //         {hoverQuestion && questionText &&
        //             <div className="absolute left-full text-sm bg-primary-dark py-2 px-4 rounded-md w-[200px] top-0 m-2 z-50">
        //                 {questionText}
        //             </div>
        //         }
        //     </button>
        // );
    }
}
