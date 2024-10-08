import { useState } from "react";
import { Button3, DeleteButton, GreenButton } from "./Buttons";

type ActionComponentProps = {
    img: string;
    title: string;
    success: boolean;
    successText: string;
    hoverSuccessText?: string;
    successAction?: () => void;
    failure: boolean;
    failureText: string;
    hoverFailureText?: string;
    failureAction?: () => void;
    normal: boolean;
    normalText: string;
    hoverNormalText?: string;
    normalAction?: () => void;
};

export default function ActionComponent({ img, title, success, successText, hoverSuccessText, successAction, failure, failureText, hoverFailureText, failureAction, normal, normalText, hoverNormalText, normalAction }: ActionComponentProps) {
    return (
        <div className="relative w-[250px] bg-[#373739] flex flex-col gap-4 justify-center items-center pt-14 pb-2 px-2">
            <div className="absolute w-20 h-20 rounded-full flex justify-center items-center bg-[#6D654E] left-[50%] top-0 -translate-x-[50%] -translate-y-[50%]">
                <img src={img} className="w-12" />
            </div>
            <p>{title}</p>
            {success ?
                <GreenButton text={successText} onClick={successAction!} disabled={!successAction} disabledHoverText={hoverSuccessText} />
                :
                failure ?
                    <DeleteButton text={failureText} onClick={failureAction!} disabled={!failureAction} disabledHoverText={hoverFailureText} />
                    :
                    <Button3 text={normalText} onClick={normalAction!} disabled={!normalAction} disabledHoverText={hoverNormalText} />
            }
        </div>
    );
}