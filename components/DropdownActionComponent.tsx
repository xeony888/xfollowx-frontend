import { useEffect, useState } from "react";
import { Button3 } from "./Buttons";
import React from "react";

type DropdownActionComponentProps = {
    img: string;
    title: string;
    paid: boolean;
    connected: boolean;
    onChange: (n: number) => void;
    options: any[];
    action: () => void;
};
//
const LINK = "https://app.hel.io/s/670a6f12cc50d45bfb6e101f";
const DISCORD_LINK = "https://discord.com/oauth2/authorize?client_id=1283409803833507890";
export default function DropdownActionComponent({ img, title, paid, connected, options, onChange, action }: DropdownActionComponentProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>(options[0]);
    useEffect(() => {
        onChange(options[0]);
    }, []);
    const swap = () => {
        if (!selected) {
            action();
        } else {
            setIsOpen(!isOpen);
        }
    };
    const change = (n: any) => {
        setSelected(n);
        onChange(n);
    };
    const visit = () => {
        window.open(LINK, "_blank");
    };
    const copy = async () => {
        await navigator.clipboard.writeText(selected?.id);
    };
    const visit2 = () => {
        window.open(DISCORD_LINK, "_blank");
    };
    return (
        <div className="relative w-[600px] bg-[#373739] flex flex-col gap-4 justify-center items-center pt-14 pb-2 px-2">
            <div className="absolute w-20 h-20 rounded-full flex justify-center items-center bg-[#6D654E] left-[50%] top-0 -translate-x-[50%] -translate-y-[50%]">
                <img src={img} className="w-12" />
            </div>
            <p className="font-bold">{title}</p>
            {!selected ? <></>
                :
                <>
                    {
                        paid ?
                            <p>This server is paid for</p>
                            :
                            <div className="flex flex-col justify-center items-center gap-2">
                                <p>Click <span className="underline hover:cursor-pointer font-bold text-primary-dark" onClick={visit}>here</span> to pay</p>
                                <p>You'll have to connect your discord and enter your server id (shown below)</p>
                                <Button3 onClick={copy} text="Copy Server ID" />
                            </div>
                    }
                    {connected ?
                        <p>This server is connected</p>
                        :
                        <p>Click <span className="underline hover:cursor-pointer font-bold text-primary-dark" onClick={visit2} >here</span> to add the bot to a guild</p>
                    }
                </>
            }
            <div className="w-full relative">
                <button
                    className="relative w-full cursor-pointer text-white text-base py-2 px-6 bg-primary-dark hover:brightness-95 active:brightness-75"
                    onClick={swap}
                    style={{ textShadow: "2px 2px 4px gray" }}
                >
                    <div className="flex flex-row justify-between items-center">
                        <p>{!selected ? "Create Server" : `Server: ${selected.id}`}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                        </svg>
                    </div>
                </button>
                {isOpen &&
                    <div className="absolute top-full mt-2 left-0 flex flex-col justify-start h-[100px] items-center w-full gap-2 overflow-y-auto">
                        {options.filter((option) => option !== selected).map((option, i) => {
                            return (
                                <div className="w-full" key={i}>
                                    <Button3 onClick={() => change(option)} text={`Server: ${option.id}`} />
                                </div>
                            );
                        })}
                        <Button3 onClick={action} text="Create Server" />
                    </div>
                }
            </div>
        </div>
    );
}