import WalletButton from "./WalletButton";



export default function NavBar() {
    return (
        <div className="w-full flex flex-row justify-between items-center px-10 py-2 border-b border-yellow-500 bg-[#161616]">
            <img src="/Xconnect.png" className="w-8 md:w-10 lg:w-16" />
            <div className="flex flex-row justify-center items-center gap-4">
                <p className="text-xs md:text-base">Whitepaper</p>
                <img src="/x.png" className="w-4 md:w-6" />
                <img src="/discord.png" className="w-4 md:w-6" />
                {/* <WalletButton /> */}
            </div>
        </div>
    );
}