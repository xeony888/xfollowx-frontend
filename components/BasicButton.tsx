

type BasicButtonProps = {
    text: string;
    color: string;
    onClick: () => any;
};
export default function BasicButton({ text, color, onClick }: BasicButtonProps) {
    if (color === "green") {
        return (
            <button className="py-2 px-4 bg-green-500 hover:brightness-90 active:brightness-75" onClick={onClick}>
                {text}
            </button>
        );
    } else if (color === "red") {
        return (
            <button className="py-2 px-4 bg-red-500 hover:brightness-90 active:brightness-75" onClick={onClick}>
                {text}
            </button>
        );
    } else {
        return (
            <button className="py-2 px-4 bg-white hover:brightness-90 active:brightness-75" onClick={onClick}>
                {text}
            </button>
        );
    }
}