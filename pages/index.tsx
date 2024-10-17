import React, { useEffect, useState } from "react";
import ActionComponent from "@/components/ActionComponent";
import { Button3, DeleteButton } from "@/components/Buttons";
import GradientBorder from "@/components/GradientBorder";
import StyledInput from "@/components/StyledInput";
import Toggle from "@/components/Toggle";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

type PaidStatus = "NEVER" | "FUTURE" | "EXPIRED";
const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;
export default function Home() {
  const [user, setUser] = useState<any>();
  const [addingTwitter, setAddingTwitter] = useState<boolean>(false);
  const [discord, setDiscord] = useState<any>();
  const [servers, setServers] = useState<any[]>([]);
  const [twitterAdding, setTwitterAdding] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [showAdminElements, setShowAdminElements] = useState<boolean>(false);
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
          console.log("using stored data");
          // only use stored if date is not in future
          discord = sessionStorage.getItem("discord");
          access2 = sessionStorage.getItem("discord_access_token");
          refresh2 = sessionStorage.getItem("discord_refresh_token");
        } else {
          console.log("Not using stored data");
          sessionStorage.setItem("time", new Date(Date.now() + EXPIRY_TIME).toString());
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
      sessionStorage.setItem("discord", JSON.stringify(finalUsername) || "");
      sessionStorage.setItem("discord_access_token", finalAccess || "");
      sessionStorage.setItem("discord_refresh_token", finalRefresh || "");
      sessionStorage.setItem("time", new Date(Date.now() + EXPIRY_TIME).toString());
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
        days: json.days,
        discordName: json.discordName,
        discordId: json.discordId,
      });
      setServers(json.servers || []);
    });
  }, [discord, accessToken]);
  const connectDiscord = async () => {
    const url = process.env.NEXT_PUBLIC_REDIRECT_URL;
    console.log(url);
    window.open(url, "_blank")?.focus();
  };
  const addTwitter = async () => {
    if (!user) return;
    const TWITTER_CLIENT_ID = "dmhMQWNITWw3RWd5R2p0OTQwRXg6MTpjaQ"; // give your twitter client id here
    const rootUrl = "https://twitter.com/i/oauth2/authorize";
    const options = {
      redirect_uri: process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URL!, // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
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
          successAction={addTwitter}
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
            <div className="relative w-[600px] bg-[#373739] flex flex-col gap-4 justify-center items-center pt-14 pb-2 px-2">
              <div className="absolute w-20 h-20 rounded-full flex justify-center items-center bg-[#6D654E] left-[50%] top-0 -translate-x-[50%] -translate-y-[50%]">
                <img src="/key.png" className="w-12" />
              </div>
              <p className="font-bold">Manage Servers</p>
              <div className="flex flex-col justify-center items-center">
                <p className="text-4xl font-extrabold">{user?.days || 0}</p>
                <p>days left</p>
                <p
                  className="text-primary-dark underline hover:cursor-pointer"
                  onClick={() => window.open("https://app.hel.io/pay/67110db71b2d8daa30aba1f5", "_blank")}
                >
                  Buy More
                </p>
              </div>

              {servers && servers.length > 0 ?
                <>
                  <p>Your Connected Servers</p>
                  <div className="grid grid-cols-4 place-items-center items-center">
                    {servers.map((server) => (
                      <p className="bg-primary-dark rounded-lg p-2">{server.guildName}</p>
                    ))}
                  </div>
                </>

                :
                <p className="italic">You have not added the bot to any servers</p>
              }
              <Button3 onClick={() => window.open("https://discord.com/oauth2/authorize?client_id=1283409803833507890", "_blank")} text="Add Bot to new Discord Server" />
            </div>
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
