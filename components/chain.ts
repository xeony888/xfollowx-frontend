import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import idl from "./lens_payment.json";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";

export const GROUP_ID: number = 26;
export const LEVEL: number = 1;
export const CREATOR: PublicKey = new PublicKey("Ddi1GaugnX9yQz1WwK1b12m4o23rK1krZQMcnt2aNW97");
function getProvider() {
    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!);
    const provider = new AnchorProvider(connection, (window as any).solana, AnchorProvider.defaultOptions());
    const program: any = new Program(idl as any, provider);
    return {
        connection,
        provider,
        program
    };
}
export async function buy(id: number, amount: number, wallet: PublicKey) {
    const { program } = getProvider();
    const tx = await program.methods.buy(new BN(GROUP_ID), new BN(id), new BN(LEVEL), amount).account({
        signer: wallet
    }).rpc();
    return tx;
}
export async function cancel(id: number, amount: number, wallet: PublicKey) {
    const { program } = getProvider();
    const tx = await program.methods.cancel(new BN(GROUP_ID), new BN(id), LEVEL, amount).accounts({
        signer: wallet
    }).rpc();
    return tx;
}
export async function pay(id: number, amount: number, wallet: PublicKey) {
    const { program } = getProvider();
    const tx = await program.methods.pay(new BN(GROUP_ID), new BN(id), LEVEL, new BN(amount)).accounts({
        signer: wallet,
    }).rpc();
    return tx;
}
export async function withdraw(id: number, wallet: PublicKey) {
    const { program } = getProvider();
    const tx = await program.methods.withdraw(new BN(GROUP_ID), new BN(id), LEVEL).accounts({
        signer: wallet,
    }).rpc();
    return tx;
}
export async function initialize(wallet: PublicKey) {
    const { program } = getProvider();
    const withdraw = Keypair.generate();
    const tx1 = await program.methods.initialize().accounts({
        signer: wallet
    }).rpc({ skipPreflight: true });
    const tx2 = await program.methods.createPaymentGroup(new BN(GROUP_ID), withdraw.publicKey, new BN(10), false).accounts({
        signer: wallet,
        creator: CREATOR,
    }).rpc({ skipPreflight: true });
    return [tx1, tx2];
}

export async function isInitialized() {
    try {
        const { program } = getProvider();
        const [globalAccountAddress] = PublicKey.findProgramAddressSync(
            [Buffer.from("global")],
            program.programId,
        );
        const globalAccount = await program.account.globalDataAccount.fetch(globalAccountAddress);
        return true;
    } catch (e) {
        return false;
    }
}
export async function modifyPaymentGroupData(wallet: PublicKey, withdrawAuthority: PublicKey, lamportsPerSec: number) {
    const { program } = getProvider();
    const tx = await program.methods.modifyPaymentGroup(new BN(GROUP_ID), withdrawAuthority, new BN(lamportsPerSec)).accounts({
        signer: wallet,
    }).rpc();
    return tx;
}
export async function getGlobalData() {
    const { program, connection } = getProvider();
    const [globalAccountAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("global")],
        program.programId,
    );
    const globalAccount = await program.account.globalDataAccount.fetch(globalAccountAddress);
    const [paymentGroupAccountAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("group"), new BN(GROUP_ID).toArrayLike(Buffer, "le", 8)],
        program.programId,
    );
    const [paymentGroupAccountHolderAddress] = PublicKey.findProgramAddressSync(
        [paymentGroupAccountAddress.toBuffer()],
        program.programId
    );
    const balance = await connection.getBalance(paymentGroupAccountHolderAddress);
    const paymentGroupAccount = await program.account.paymentGroupAccount.fetch(paymentGroupAccountAddress);
    return {
        feePerc: globalAccount.feePerc,
        initFee: globalAccount.initFee,
        groupId: paymentGroupAccount.groupId,
        modifyAuthority: paymentGroupAccount.modifyAuthority,
        withdrawAuthority: paymentGroupAccount.withdrawAuthority,
        lamportsPerSec: paymentGroupAccount.lamportsPerSec,
        holderBalance: balance,
    };
}
export async function getPaymentData(id: number) {
    const { program } = getProvider();
    const [paymentAccountAddress] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("payment"),
            new BN(GROUP_ID).toArrayLike(Buffer, "le", 8),
            new BN(id).toArrayLike(Buffer, "le", 8),
            new BN(LEVEL).toArrayLike(Buffer, "le", 1)
        ],
        program.programId
    );
    try {
        const paymentAccount = await program.account.paymentAccount.fetch(paymentAccountAddress);
        return {
            authority: paymentAccount.authority.toString(),
            until: new Date(paymentAccount.until.toNumber() * 1000),
        };
    } catch (e) {
        return null;
    }

}
export async function withdrawAll(wallet: PublicKey) {
    const { program, connection } = getProvider();
    const paymentAccounts = await program.account.paymentAccount.all([
        {
            memcmp: {
                offset: 8,
                bytes: new BN(GROUP_ID).toString()
            }
        }
    ]);
    console.log(paymentAccounts);
    // need to have a payment account first
}