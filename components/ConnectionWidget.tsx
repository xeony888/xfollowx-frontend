import { useState } from "react";
import { Button3 } from "./Buttons";
import GradientBorder from "./GradientBorder";


type ConnectionWidgetProps = {
    text: string;
    icon: string;
    connected: boolean;
    onConnect: () => any;
    onDisconnect: () => any;
    canDisconnect?: boolean;
};
export default function ConnectionWidget({ text, icon, connected, onConnect, onDisconnect, canDisconnect }: ConnectionWidgetProps) {
    return (
        <GradientBorder>
            <div className="flex flex-row justify-center items-center gap-4 py-2 px-8">
                <img src={icon} className="h-8" />
                {connected &&
                    <div className="relative">
                        <p>{text}</p>
                    </div>
                }
                <Button3 text={connected ? "Disconnect" : "Connect"} onClick={() => connected ? onDisconnect() : onConnect()} disabled={!canDisconnect} />
            </div>
        </GradientBorder>
    );
}