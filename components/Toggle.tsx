type ToggleProps = {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    disabled?: boolean;
};

export default function Toggle({ enabled, setEnabled, disabled = false }: ToggleProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${enabled ? 'bg-blue-500' : 'bg-green-500'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <span
                className={`transform transition-transform inline-block w-5 h-5 bg-white rounded-full ${enabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
            />
        </button>
    );
};