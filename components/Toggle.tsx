
type ToggleProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
};
export default function Toggle({ checked, onChange }: ToggleProps) {
    return (
        <div
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${checked ? 'bg-yellow-500' : 'bg-gray-600'
                }`}
            onClick={() => onChange(!checked)}
        >
            <div
                className={`h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6 bg-white' : 'translate-x-0 bg-gray-900'
                    }`}
            />
        </div>
    );
}