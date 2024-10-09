import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import TransactionSuccess from "@/components/TransactionSuccess";
import TransactionFailure from "@/components/TransactionFailure";
import TransactionPending from "@/components/TransactionPending";
import { getPaymentData, pay } from "@/components/chain";
import ActionComponent from "@/components/ActionComponent";
import { Button3, DeleteButton } from "@/components/Buttons";
import GradientBorder from "@/components/GradientBorder";
import StyledInput from "@/components/StyledInput";
import WalletButton from "@/components/WalletButton";
import { parseDate, toDDMMYYYY } from "@/components/utils";
import Toggle from "@/components/Toggle";
import DropdownActionComponent from "@/components/DropdownActionComponent";

type PaidStatus = "NEVER" | "FUTURE" | "EXPIRED";
export default function Home() {
  const { publicKey } = useWallet();
  const [user, setUser] = useState<any>();
  const [addingTwitter, setAddingTwitter] = useState<boolean>(false);
  const [discord, setDiscord] = useState<any>();
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<any>();
  const [twitterAdding, setTwitterAdding] = useState<string>("");
  const [succeededTransaction, setSucceededTransaction] = useState<boolean>(false);
  const [failedTransaction, setFailedTransaction] = useState<boolean>(false);
  const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [showAdminElements, setShowAdminElements] = useState<boolean>(false);
  const [until, setUntil] = useState<Date | undefined>();
  const [buyingSolana, setBuyingSolana] = useState<boolean>(false);
  const [daysBought, setDaysBought] = useState<number>(0);
  const [paidStatus, setPaidStatus] = useState<PaidStatus>("NEVER");
  useEffect(() => {
    if (!discord || !accessToken) return;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${discord.id}?access=${accessToken}&discordId=${discord.id}&discordName=${discord.global_name}`).then(async (response) => {
      const json = await response.json();
      setUser({
        wallet: json.wallet,
        discord: json.discord,
        twitter: json.twitter,
        discordName: json.discordName,
        discordId: json.discordId,
      });
      console.log(json);
      setServers(json.servers || []);
    });
  }, [discord, accessToken]);
  useEffect(() => {
    if (selectedServer !== undefined && selectedServer !== null) {
      getPaymentData(selectedServer.id).then((result) => {
        setUntil(result?.until);
        if (!result) {
          setPaidStatus("NEVER");
        } else {
          setPaidStatus(new Date() > result.until ? "EXPIRED" : "FUTURE");
        }
      });
    }
  }, [selectedServer]);
  useEffect(() => {
    const discord = sessionStorage.getItem("discord");
    const access = sessionStorage.getItem("discord_access_token");
    const refresh = sessionStorage.getItem("discord_refresh_token");
    if (discord) {
      setDiscord(JSON.parse(discord));
      setAccessToken(access!);
      setRefreshToken(refresh!);
    }
  }, []);
  const connectDiscord = async () => {
    const url = process.env.NEXT_PUBLIC_REDIRECT_URL;
    console.log(url);
    window.open(url, "_blank")?.focus();
  };
  const createServer = async () => {
    if (!user || !accessToken) return;
    console.log("here");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/server`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordId: user.discordId,
          access: accessToken
        })
      }
    );
    const json = await response.json();
    setServers([...servers, json]);
  };
  const addTwitter = async () => {
    if (!twitterAdding || !user || !accessToken) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.discordId}/twitter/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twitter: twitterAdding,
          discordId: user.discordId,
          access: accessToken
        })
      }
    );
    if (response.status === 200) {
      setUser((user: any) => {
        return { ...user, twitter: twitterAdding };
      });
      setAddingTwitter(false);
    }
  };
  const removeTwitter = async () => {
    if (!user || !accessToken) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.discordId}/twitter/remove`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access: accessToken,
          discordId: user.discordId
        })
      }
    );
    if (response.status === 200) {
      setUser((user: any) => {
        return { ...user, twitter: null };
      });
    }
  };
  const buySolana = async () => {
    if (!publicKey || !user || !user.server || !accessToken) return;
    try {
      setSendingTransaction(true);
      const days = daysBought * 86400;
      const tx = await pay(user.server.id, days, publicKey);
      console.log(tx);
      setSucceededTransaction(true);
      const n = new Date(Date.now() + days);
      setUntil(n);
      // now set the server to say that we have bought solana
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/server/${user.server.id}/set`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access: accessToken,
            discordId: user.discordId,
            type: "chain"
          })
        }
      );
      setBuyingSolana(false);
    } catch (e) {
      console.error(e);
      setFailedTransaction(true);
    } finally {
      setSendingTransaction(false);
      setTimeout(() => {
        setFailedTransaction(false);
        setSucceededTransaction(false);
      }, 5000);
    }
  };
  return (
    <div className="flex flex-col justify-start gap-4 items-center w-full bg-[#1E1E1E]">
      {succeededTransaction &&
        <div className="fixed bottom-0 left-0 ml-6 mb-6">
          <TransactionSuccess />
        </div>
      }
      {failedTransaction &&
        <div className="fixed bottom-0 left-0 ml-6 mb-6">
          <TransactionFailure />
        </div>
      }
      {sendingTransaction &&
        <div className="fixed bottom-0 left-0 ml-6 mb-6">
          <TransactionPending />
        </div>
      }
      <p className="text-5xl mt-10 font-bold"><span className="text-yellow-500">X</span>Connect</p>
      <p className="mb-20">To create an account, complete the below steps</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-2">
        <ActionComponent
          img="/discord.png"
          title="Login with Discord"
          normal={!user}
          normalText="Login"
          normalAction={connectDiscord}
          success={!!user}
          successText={user?.discordName}
          failure={false}
          failureText=""
        />
        <ActionComponent
          img="/x.png"
          title="Connect X"
          normal={user && !user.twitter}
          normalText="Connect"
          normalAction={() => setAddingTwitter(true)}
          success={user && user.twitter}
          successText={user?.twitter}
          hoverSuccessText="Change Twitter"
          successAction={() => setAddingTwitter(true)}
          failure={false}
          failureText=""
        />
      </div>
      <p>For server admins</p>
      <Toggle checked={showAdminElements} onChange={setShowAdminElements} />
      {showAdminElements &&
        <>
          <p className="mt-5 text-center">To add the bot to your server, complete the below steps</p>
          <div className="grid grid-cols-1 place-items-center items-center gap-10 md:gap-4 mt-10 mb-5">
            {/* <ActionComponent
              img="/discord.png"
              title="Add Bot to Server"
              success={false}
              successText=""
              normal={true}
              normalText="Add"
              normalAction={() => window.open("https://discord.com/oauth2/authorize?client_id=1283409803833507890", "_blank")}
              failure={false}
              failureText=""
            /> */}
            <DropdownActionComponent
              img="/key.png"
              title="Manage Servers"
              options={servers}
              onChange={(n: number) => setSelectedServer(n)}
              action={createServer}
            />
            {/* <ActionComponent
              img="/wallet.png"
              title="Subscribe"
              success={paidStatus === "FUTURE"}
              successText={`Paid until ${toDDMMYYYY(until || new Date())}`}
              hoverSuccessText="Buy More"
              successAction={() => setBuyingSolana(true)}
              normal={paidStatus === "NEVER"}
              normalText="Pay"
              normalAction={() => setBuyingSolana(true)}
              failure={paidStatus === "EXPIRED"}
              failureText="Pay"
              failureAction={() => setBuyingSolana(true)}
            /> */}
          </div>
        </>
      }
      {addingTwitter &&
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <GradientBorder>
            <div className="flex flex-col justify-center items-center p-4 gap-4">
              <p>Enter your twitter username</p>
              <StyledInput
                placeholder="Your X handle"
                type="text"
                value={`@${twitterAdding.trim().replaceAll("@", "")}`}
                onChange={(event: any) => setTwitterAdding(event.target.value)}
              />
              <div className="flex flex-row justify-center items-center gap-2">
                <Button3 onClick={addTwitter} text="Add" disabled={!twitterAdding} />
                <DeleteButton onClick={() => setAddingTwitter(false)} text="Cancel" />
              </div>
            </div>
          </GradientBorder>
        </div>
      }
      {buyingSolana &&
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <GradientBorder>
            <div className="flex flex-col justify-center items-center p-4 gap-4">
              <p>Days to buy</p>
              <StyledInput
                placeholder="Days..."
                type="text"
                value={daysBought}
                onChange={(event: any) => setDaysBought(Number(event.target.value))}
              />
              <div className="flex flex-row justify-center items-center gap-2">
                <Button3 onClick={buySolana} text="Buy" disabled={!publicKey} />
                <WalletButton />
                <DeleteButton onClick={() => setBuyingSolana(false)} text="Cancel" />
              </div>
            </div>
          </GradientBorder>
        </div>
      }
    </div>
  );
}
