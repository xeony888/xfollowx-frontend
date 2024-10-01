import { useState } from "react";
import { Button3, DeleteButton } from "./Buttons";

type ActionComponentProps = {
    img: string;
    title: string;
    buttonText: string;
    onAction: () => void;
    hoverText?: string;
    disabled?: boolean;
    reverse?: boolean;
    reverseAction?: () => void;
};

export default function ActionComponent({ img, title, buttonText, hoverText, onAction, disabled, reverse, reverseAction }: ActionComponentProps) {
    return (
        <div className="relative w-[250px] bg-[#373739] flex flex-col gap-4 justify-center items-center pt-14 pb-2 px-2">
            <div className="absolute w-20 h-20 rounded-full flex justify-center items-center bg-[#6D654E] left-[50%] top-0 -translate-x-[50%] -translate-y-[50%]">
                <img src={img} className="w-12" />
            </div>
            <p>{title}</p>
            {reverse ?
                <DeleteButton text={buttonText} disabledHoverText={hoverText} onClick={reverseAction!} disabled={disabled} />
                :
                <Button3 text={buttonText} onClick={onAction} disabled={disabled} />
            }
        </div>
    );
}