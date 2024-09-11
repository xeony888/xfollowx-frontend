import GradientBorder from "./GradientBorder";

type StyledInputProps = {
    placeholder: string,
    type: string,
    value: any,
    onChange: (...t: any[]) => any;
};
export default function StyledInput({ placeholder, type, value, onChange }: StyledInputProps) {
    return (
        <GradientBorder>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="bg-transparent w-full py-2 px-4 text-white placeholder-white focus:outline-none"
            />
        </GradientBorder>
    );
}