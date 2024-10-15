import React, { useEffect, useState } from "react";
import ActionComponent from "@/components/ActionComponent";
import { Button3, DeleteButton } from "@/components/Buttons";
import GradientBorder from "@/components/GradientBorder";
import StyledInput from "@/components/StyledInput";
import Toggle from "@/components/Toggle";
import DropdownActionComponent from "@/components/DropdownActionComponent";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

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
      const { username, refresh, access, id } = router.query;
      let discord, access2, refresh2;
      let time = sessionStorage.getItem("time");
      if (time) {
        const date = new Date(time);
        if (date.valueOf() > Date.now()) {
          // only use stored if date is not in future
          discord = sessionStorage.getItem("discord");
          access2 = sessionStorage.getItem("discord_access_token");
          refresh2 = sessionStorage.getItem("discord_refresh_token");
        } else {
          sessionStorage.setItem("time", new Date().toString());
        }
      }
      const finalUsername = username && id ? { id, username } : (discord ? JSON.parse(discord) : undefined);
      const finalAccess = (access || access2) as string;
      const finalRefresh = (refresh || refresh2) as string;
      console.log({ finalUsername, finalAccess, finalRefresh });
      setDiscord(finalUsername);
      setAccessToken(finalAccess);
      setRefreshToken(finalRefresh);
      setShowAdminElements(owner === "true");
      sessionStorage.setItem("discord", finalUsername || "");
      sessionStorage.setItem("discord_access_token", finalAccess || "");
      sessionStorage.setItem("discord_refresh_token", finalRefresh || "");
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
    if (!user) return;
    const TWITTER_CLIENT_ID = "dmhMQWNITWw3RWd5R2p0OTQwRXg6MTpjaQ"; // give your twitter client id here
    const rootUrl = "https://twitter.com/i/oauth2/authorize";
    const options = {
      redirect_uri: "http://www.localhost:3001/auth/twitter", // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
      client_id: TWITTER_CLIENT_ID,
      state: user.discordId,
      response_type: "code",
      code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
      code_challenge_method: "S256",
      scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(" "), // add/remove scopes as needed
    };
    const qs = new URLSearchParams(options).toString();
    const url = `${rootUrl}?${qs}`;
    console.log(url);
    window.open(url, "_blank");
    // if (!twitterAdding || !user || !accessToken) return;
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.discordId}/twitter/add`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       twitter: twitterAdding,
    //       discordId: user.discordId,
    //       access: accessToken
    //     })
    //   }
    // );
    // if (response.status === 200) {
    //   setUser((user: any) => {
    //     return { ...user, twitter: twitterAdding };
    //   });
    //   setAddingTwitter(false);
    // }
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
          normalAction={user ? addTwitter : undefined}
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
