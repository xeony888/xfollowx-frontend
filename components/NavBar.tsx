import WalletButton from "./WalletButton";



export default function NavBar() {
    return (
        <div className="w-full flex flex-row justify-between items-center px-4 py-2 border-b-4 border-yellow-500">
            <img src="/logo.png" className="w-16" />
            <p>XFollowX</p>
            <div className="flex flex-row justify-center items-center gap-2">
                <p>WhitePaper</p>
                <img src="/x.png" className="w-6" />
                <img src="/discord.png" className="w-6" />
                <WalletButton />
            </div>
        </div>
    );
}