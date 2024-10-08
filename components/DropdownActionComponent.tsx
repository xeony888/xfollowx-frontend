import { useState } from "react";
import { Button3 } from "./Buttons";

type DropdownActionComponentProps = {
    img: string;
    title: string;
    onChange: (n: number) => void;
    options: any[];
    action: () => void;
    actionText: string;
};
export default function DropdownActionComponent({ img, title, options, onChange, action, actionText }: DropdownActionComponentProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(options[0]?.id);
    const swap = () => {
        if (Number.isNaN(Number(selected))) {
            action();
        } else {
            setIsOpen(!isOpen);
        }
    };
    const change = (n: any) => {
        setSelected(n.id);
        onChange(n);
    };
    return (
        <div className="relative w-[250px] bg-[#373739] flex flex-col gap-4 justify-center items-center pt-14 pb-2 px-2">
            <div className="absolute w-20 h-20 rounded-full flex justify-center items-center bg-[#6D654E] left-[50%] top-0 -translate-x-[50%] -translate-y-[50%]">
                <img src={img} className="w-12" />
            </div>
            <p>{title}</p>
            <div className="w-full relative">
                <Button3 onClick={swap} text={Number.isNaN(Number(selected)) ? actionText : `Selected Server: ${selected}`} />
                {isOpen &&
                    <div className="absolute top-full mt-2 left-0 flex flex-col justify-start h-[100px] items-center w-full gap-2 overflow-y-auto">
                        {options.filter((option) => option !== selected).map((option, i) => {
                            return (
                                <div className="w-full" key={i}>
                                    <Button3 onClick={() => change(option)} text={`${option.id} ${option.connectedDiscordServerName ? `connected to ${option.connectedDiscordServerName}` : "not connected"}`} />
                                </div>
                            );
                        })}
                        <Button3 onClick={action} text={actionText} />
                    </div>
                }
            </div>
        </div>
    );
}