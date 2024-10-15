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
import Toggle from "@/components/Toggle";
import DropdownActionComponent from "@/components/DropdownActionComponent";
import { useRouter } from "next/router";

type PaidStatus = "NEVER" | "FUTURE" | "EXPIRED";
export default function Home() {
  const [user, setUser] = useState<any>();
  const [addingTwitter, setAddingTwitter] = useState<boolean>(false);
  const [discord, setDiscord] = useState<any>();
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<any>();
  const [twitterAdding, setTwitterAdding] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [showAdminElements, setShowAdminElements] = useState<boolean>(false);
  const [paid, setPaid] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (router && router.isReady) {
      const { owner } = router.query;
      setShowAdminElements(owner === "true");
    }
  }, [router, router.isReady]);
  useEffect(() => {
    if (!discord || !accessToken) return;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${discord.id}?access=${accessToken}&discordId=${discord.id}&discordName=${discord.username}`).then(async (response) => {
      const json = await response.json();
      setUser({
        wallet: json.wallet,
        discord: json.discord,
        twitter: json.twitter,
        discordName: json.discordName,
        discordId: json.discordId,
      });
      setServers(json.servers || []);
    });
  }, [discord, accessToken]);
  useEffect(() => {
    console.log(selectedServer);
    if (selectedServer !== undefined && selectedServer !== null) {
      (async () => {
        // add caching maybe
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/server/${selectedServer.id}`,
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
        setPaid(json.subscribed);
        setConnected(Boolean(json.connectedDiscordServerName));
      })();
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
    setServers(servers => [...servers, json]);
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
  const toggle = (b: boolean) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        owner: b.toString(), // convert boolean to string since query params are strings
      },
    });
    setShowAdminElements(b);
  };
  return (
    <div className="flex flex-col justify-start gap-4 items-center w-full bg-[#1E1E1E]">
      <p className="text-5xl mt-10 font-bold"><span className="text-yellow-500">X</span>Connect</p>
      <p className="mb-20">To create an account, complete the below steps</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-2">
        <ActionComponent
          img="/discord.png"
          title="Login with Discord"
          normalText="Login"
          normalAction={connectDiscord}
          success={!!user}
          successText={user?.discordName}
          successAction={() => null}
          failure={false}
          failureText=""
        />
        <ActionComponent
          img="/x.png"
          title="Connect X"
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
      <Toggle checked={showAdminElements} onChange={toggle} />
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
              paid={paid}
              connected={connected}
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
    </div>
  );
}
