

export default function GradientBorder({ children, color }: { color?: string, children: React.ReactNode; }) {
    if (color === "gray") {
        return (
            <div className="bg-shiny-gradient-3 rounded-lg p-[3px] w-auto">
                <div className="bg-black rounded-lg">
                    {children}
                </div>
            </div>
        );
    } else {
        return (
            <div className="bg-shiny-gradient-1 rounded-lg p-[3px] w-auto">
                <div className="bg-black rounded-lg">
                    {children}
                </div>
            </div>
        );
    }
}