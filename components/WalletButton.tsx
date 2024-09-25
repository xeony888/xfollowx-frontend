import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { shortenAddress } from './utils';
import { Button3 } from './Buttons';

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
            <Button3 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} text={connected ? `${hover ? "Disconnect" : shortenAddress(publicKey?.toString() || "")}` : "Connect Wallet"} onClick={action} />
        </>
    );
}