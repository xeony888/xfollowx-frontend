import { useState } from "react";
import BasicButton from "./BasicButton";
import { fund } from "./chain";
import GradientBorder from "./GradientBorder";
import CopyText from "./CopyText";
import { shortenAddress } from "./utils";
import { GreenButton } from "./Buttons";


type ServerWidgetProps = {
    id: string;
};
export default function ServerWidget({ id }: ServerWidgetProps) {
    return (
        <GradientBorder>
            <div className="w-full flex flex-col justify-center items-center p-4">
                <CopyText text={shortenAddress(id)} copy={id} />
                <GreenButton text="Fund" onClick={() => undefined} />
            </div>
        </GradientBorder>
    );
}