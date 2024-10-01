


export default function Wrapper({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex flex-col items-center w-screen min-h-screen justify-between relative">
            {children}
        </div>
    );
}