import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { shortenAddress } from './utils';

export const WalletMultiButton = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);
export default function WalletButton() {
    const { connected, disconnect, publicKey } = useWallet();
    const [hover, setHover] = useState<boolean>(false);
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);
    const action = () => {
        if (connected) {
            disconnect();
        } else {
            const button = document.querySelector("#click button") as HTMLButtonElement;
            button.click();
            console.log("connecting");
        }
    };
    return (
        <>
            <div id="click" style={{ display: "none" }}>
                <WalletMultiButton />
            </div>
            <button className="hover:opacity-80 flex flex-row gap-2 justify-center items-cente text-white bg-yellow-500 py-2 px-4" onClick={action} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <p>{connected ? `${hover ? "Disconnect" : shortenAddress(publicKey?.toString() || "")}` : "Connect Wallet"}</p>
            </button>
        </>
    );
}