import { useState } from "react";
import { Button3 } from "./Buttons";

type DropdownActionComponentProps = {
    img: string;
    title: string;
    onChange: (n: number) => void;
    options: any[];
    action: () => void;
};
export default function DropdownActionComponent({ img, title, options, onChange, action }: DropdownActionComponentProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>(options[0]);
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
    return (
        <div className="relative w-[400px] bg-[#373739] flex flex-col gap-4 justify-center items-center pt-14 pb-2 px-2">
            <div className="absolute w-20 h-20 rounded-full flex justify-center items-center bg-[#6D654E] left-[50%] top-0 -translate-x-[50%] -translate-y-[50%]">
                <img src={img} className="w-12" />
            </div>
            <p className="font-bold">{title}</p>
            <div className="w-full relative">
                <button
                    className="w-full cursor-pointer text-white text-base py-2 px-6 text-center transition duration-200 ease-in-out 
            shadow-[inset_0px_-3px_7px_0px_rgba(250,204,21,1)] 
            bg-gradient-to-b from-secondary-dark to-primary-dark 
            rounded-[3px]
            hover:bg-gradient-to-b hover:from-primary-dark hover:to-secondary-dark 
            active:brightness-90
            text-shadow-[0px_1px_0px_rgba(102,54,38,1)] relative flex flex-row justify-between items-center"
                    onClick={swap}
                >
                    <p>{!selected ? "Create Server" : `Server ${selected.id}`}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                </button>
                {isOpen &&
                    <div className="absolute top-full mt-2 left-0 flex flex-col justify-start h-[100px] items-center w-full gap-2 overflow-y-auto">
                        {options.filter((option) => option !== selected).map((option, i) => {
                            return (
                                <div className="w-full" key={i}>
                                    <Button3 onClick={() => change(option)} text={`Server ${option.id}`} />
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