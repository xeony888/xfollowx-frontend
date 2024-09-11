


export default function Wrapper({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex flex-col justify-start items-center w-screen">
            {children}
        </div>
    );
}