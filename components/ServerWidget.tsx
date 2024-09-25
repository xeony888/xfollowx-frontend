import { useEffect, useState } from "react";
import GradientBorder from "./GradientBorder";
import CopyText from "./CopyText";
import { Button3, DeleteButton, GreenButton } from "./Buttons";
import Toggle from "./Toggle";
import { loadStripe } from "@stripe/stripe-js";
import { useWallet } from "@solana/wallet-adapter-react";
import { getPaymentData, pay } from "./chain";
import { SubscriptionType, toDDMMYYYY } from "./utils";
import StyledInput from "./StyledInput";


type ServerWidgetProps = {
    id: number;
    subscription: SubscriptionType;
    buySolana: (amount: number) => any;
};
export default function ServerWidget({ id, subscription, buySolana }: ServerWidgetProps) {
    const { publicKey } = useWallet();
    const [canToggle, ___] = useState<boolean>(subscription === "UNDEFINED");
    const [toggled, setToggled] = useState<boolean>(subscription === "STRIPE");
    const [solanaPaymentData, setSolanaPaymentData] = useState<any>();
    const [payingWithSolana, setPayingWithSolana] = useState<boolean>(false);
    const [daysAmount, setDaysAmount] = useState<number>(0);
    useEffect(() => {
        if (toggled) {

        } else {
            console.log(id);
            getPaymentData(id).then((data) => {
                if (data) {
                    setSolanaPaymentData({
                        ...data,
                        paid: data.until > new Date(Date.now())
                    });
                } else {
                    setSolanaPaymentData({
                        authority: "",
                        until: new Date(0),
                        paid: false
                    });
                }
            });
        }
    }, [toggled]);
    const checkoutStripe = async () => {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

        await stripe!.redirectToCheckout({
            lineItems: [
                {
                    //price: "price_1Pzc8wFrRlKsl1QggODhcdWa",
                    price: "price_1PzciLFrRlKsl1QgJbIGUxcR",
                    quantity: 1
                }
            ],
            mode: "subscription",
            successUrl: `${window.location.origin}`, // 
            cancelUrl: `${window.location.origin}`,
            clientReferenceId: publicKey!.toString() // how I match users to data
        });
    };
    const checkoutSolana = async () => {
        if (!publicKey) return;
        const toSeconds = daysAmount * 86400;
        console.log("here");
        await buySolana(daysAmount);
    };
    return (
        <GradientBorder>
            <div className="w-[200px] flex flex-col justify-center items-center gap-4 p-4">
                {payingWithSolana ?
                    <div className="flex flex-col justify-center items-center w-full gap-2">
                        <p>Amount of Days to buy</p>
                        <StyledInput placeholder="Amount of Days" type="number" value={daysAmount} onChange={(event: any) => setDaysAmount(Number(event.target.value))} />
                        <Button3 onClick={checkoutSolana} text="Pay" />
                        <DeleteButton onClick={() => setPayingWithSolana(false)} text="Back" />
                    </div>
                    :
                    <>
                        <CopyText text={id.toString()} copy={id.toString()} />
                        <div className="flex flex-row justify-between gap-4 items-center w-full">
                            <p>{toggled ? "Subscription" : "Solana"}</p>
                            <Toggle enabled={toggled} setEnabled={() => setToggled(!toggled)} disabled={!canToggle} />
                        </div>
                        {toggled ?
                            <GreenButton onClick={checkoutStripe} text="Pay with Stripe" />
                            :
                            <div className="flex flex-col justify-center items-center gap-2">
                                {solanaPaymentData &&
                                    <>
                                        <p>Cancel Authority: {solanaPaymentData.withdrawAuthority?.toString() || "N/A"}</p>
                                        <p className={`${solanaPaymentData.paid ? "text-green-500" : "text-red-500"}`}>Paid Until: {toDDMMYYYY(solanaPaymentData.until)}</p>
                                    </>
                                }
                                <GreenButton onClick={() => setPayingWithSolana(true)} text="Pay with Solana" />
                            </div>
                        }
                    </>
                }
            </div>
        </GradientBorder>
    );
}