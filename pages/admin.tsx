import { Button3 } from "@/components/Buttons";
import { getGlobalData, initialize, isInitialized, modifyPaymentGroupData, withdrawAll } from "@/components/chain";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";


export default function Admin() {
    const { publicKey } = useWallet();
    const [withdrawAuthority, setWithdrawAuthority] = useState<string>("");
    const [lamportsPerSec, setLamportsPerSec] = useState<number>(0);
    const [globalData, setGlobalData] = useState<any>();
    useEffect(() => {
        (async () => {
            if (await isInitialized()) {
                const data = await getGlobalData();
                setGlobalData(data);
                setWithdrawAuthority(data.withdrawAuthority.toString());
                setLamportsPerSec(data.lamportsPerSec.toNumber());
            }
        })();
    }, []);
    const init = async () => {
        if (!publicKey) return;
        await initialize(publicKey);
    };
    const modifyData = async () => {
        if (!publicKey) return;
        let withdraw: PublicKey;
        try {
            withdraw = new PublicKey(withdrawAuthority);
        } catch (e) {
            console.error(e);
            return;
        }
        await modifyPaymentGroupData(publicKey, withdraw, lamportsPerSec);
    };
    const withdrawAllFunds = async () => {
        if (!publicKey) return;
        await withdrawAll(publicKey);
    };
    return (
        <div className="flex flex-col justify-center items-center mt-4">
            {globalData ?
                <div className="flex flex-col justify-center items-center gap-2 mb-8">
                    <p>Cost in lamports per sec: {globalData.lamportsPerSec.toNumber()}</p>
                    <p>Modify Authority: {globalData.modifyAuthority.toString()}</p>
                    <p className="mb-4">Withdraw Authority: {globalData.withdrawAuthority.toString()}</p>
                    <div className="flex flex-row justify-center items-center gap-2 border border-white rounded-lg p-4">
                        <p className="italic">Withdraw Authority</p>
                        <input
                            placeholder="Withdraw Authority"
                            value={withdrawAuthority}
                            type="text"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWithdrawAuthority(event.target.value)}
                            className="bg-transparent"
                        />
                    </div>
                    <div className="flex flex-row justify-center items-center gap-2 border border-white rounded-lg p-4">
                        <p className="italic">Lamports per Sec</p>
                        <input
                            placeholder="Lamports Per Sec"
                            value={lamportsPerSec}
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLamportsPerSec(Number(event.target.value))}
                            className="bg-transparent"
                        />
                    </div>
                    <Button3 onClick={modifyData} text="Modify Payment Group Data" />
                </div>
                :
                <Button3 onClick={init} text="Initialize" />
            }
            <Button3 onClick={withdrawAllFunds} text="Withdraw All Funds" />
        </div>
    );
}