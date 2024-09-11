import GradientBorder from "./GradientBorder";



export default function TwitterWidget({ username }: { username: string; }) {
    return (
        <GradientBorder>
            <div className="flex flex-row justify-center items-center gap-2 p-4">
                <img src="/x.png" className="w-5 aspect-square" />
                <p>{username}</p>
            </div>
        </GradientBorder>
    );
}