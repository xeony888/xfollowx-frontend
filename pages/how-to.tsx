


export default function HowTo() {
    return (
        <div className="flex flex-col justify-start items-center w-full gap-2 mt-2">
            <p>1. Connect your Wallet</p>
            <img src="/how-to-1.png" className="h-26" />
            <p>2. Connect your discord</p>
            <img src="/how-to-2.png" className="h-26" />
            <p>3. Connect your twitter accounts</p>
            <img src="/how-to-3.png" className="h-26" />
            <p>4. Create a Server</p>
            <img src="/how-to-4.png" className="h-16" />
            <p>5. Pay with either Solana or Stripe. The {'"Paid Until"'} field tells you when your subscription expires</p>
            <img src="/how-to-5.png" className="h-26" />
        </div>
    );
}