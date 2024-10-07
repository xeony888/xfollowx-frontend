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
                className="w-full cursor-not-allowed text-white text-base py-2 px-6 text-center transition duration-200 ease-in-out 
              bg-gray-400 rounded-[3px] border border-gray-600 
              text-shadow-[0px_1px_0px_rgba(102,102,102,1)]"
                disabled
            >
                {disabledText || text}
            </button>
        );
    } else {
        return (
            <button
                onMouseEnter={onMouseEnterButton}
                onMouseLeave={onMouseLeaveButton}
                className="w-full cursor-pointer text-white text-base py-2 px-6 text-center transition duration-200 ease-in-out 
            shadow-[inset_0px_-3px_7px_0px_rgba(0, 255, 0, 1)] 
            bg-gradient-to-b from-green-800 to-green-500 
            rounded-[3px] border border-black 
            hover:bg-gradient-to-b hover:from-green-500 hover:to-green-800
            active:brightness-90
            text-shadow-[0px_1px_0px_rgba(102,54,38,1)]"
                onClick={onClick}
            >
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
                className="w-full cursor-not-allowed text-white text-base py-2 px-6 text-center transition duration-200 ease-in-out 
              bg-gray-400 rounded-[3px] border border-gray-600 
              text-shadow-[0px_1px_0px_rgba(102,102,102,1)]"
                disabled
            >
                {disabledText || text}
            </button>
        );
    } else {
        return (
            <button
                onMouseEnter={onMouseEnterButton}
                onMouseLeave={onMouseLeaveButton}
                className="w-full cursor-pointer text-white text-base py-2 px-6 text-center transition duration-200 ease-in-out 
            shadow-[inset_0px_-3px_7px_0px_rgba(255, 0, 0, 1)] 
            bg-gradient-to-b from-red-800 to-red-500
            rounded-[3px] border border-black 
            hover:bg-gradient-to-b hover:from-red-500 hover:to-red-800 
            active:brightness-90
            text-shadow-[0px_1px_0px_rgba(102,54,38,1)]"
                onClick={onClick}
            >
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
                className="w-full cursor-not-allowed text-white text-base py-2 px-6 text-center transition duration-200 ease-in-out 
              bg-gray-400 rounded-[3px] border border-gray-600 
              text-shadow-[0px_1px_0px_rgba(102,102,102,1)] relative"

                onMouseEnter={onMouseEnterButton}
                onMouseLeave={onMouseLeaveButton}
            >
                {disabledText || text}
                {questionText &&
                    <div className="absolute right-0 top-0 h-full w-6 flex items-center justify-center mr-2" onMouseEnter={onMouseEnterQuestion} onMouseLeave={onMouseLeaveQuestion}>
                        <SmallQuestion />
                    </div>
                }
                {hoverQuestion && questionText &&
                    <div className="absolute left-full text-sm bg-gray-400 py-2 px-4 rounded-md w-[200px] top-0 m-2 z-50">
                        {questionText}
                    </div>
                }
                {disabledHoverText && hoverButton &&
                    <div className="absolute top-full bg-gray-400 text-sm bg-red-600py-2 px-4 rounded-md w-[200px] m-2 z-50">
                        {disabledHoverText}
                    </div>
                }
            </button>
        );
    } else {
        return (
            <button
                className="w-full cursor-pointer text-white text-base py-2 px-6 text-center transition duration-200 ease-in-out 
            shadow-[inset_0px_-3px_7px_0px_rgba(250,204,21,1)] 
            bg-gradient-to-b from-secondary-dark to-primary-dark 
            rounded-[3px]
            hover:bg-gradient-to-b hover:from-primary-dark hover:to-secondary-dark 
            active:brightness-90
            text-shadow-[0px_1px_0px_rgba(102,54,38,1)] relative"
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {text}
                {questionText &&
                    <div className="absolute right-0 top-0 h-full w-6 flex items-center justify-center mr-2" onMouseEnter={onMouseEnterQuestion} onMouseLeave={onMouseLeaveQuestion}>
                        <SmallQuestion />
                    </div>
                }
                {hoverQuestion && questionText &&
                    <div className="absolute left-full text-sm bg-primary-dark py-2 px-4 rounded-md w-[200px] top-0 m-2 z-50">
                        {questionText}
                    </div>
                }
            </button>
        );
    }
}
