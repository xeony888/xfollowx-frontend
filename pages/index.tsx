import ConnectionWidget from "@/components/ConnectionWidget";
import ServerWidget from "@/components/ServerWidget";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import bs58 from "bs58";
import { Button3, DeleteButton } from "@/components/Buttons";
import TwitterWidget from "@/components/TwitterWidget";
import GradientBorder from "@/components/GradientBorder";
import StyledInput from "@/components/StyledInput";

const messageText = "Sign in to xfollowx";
const encodedMessage = bs58.encode(new TextEncoder().encode(messageText));
export default function Home() {
  const { connected, publicKey, signMessage } = useWallet();
  const [signature, setSignature] = useState<string>("");
  const [servers, setServers] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
  const [addingTwitter, setAddingTwitter] = useState<boolean>(false);
  const [discord, setDiscord] = useState<any>();
  const [twitterAdding, setTwitterAdding] = useState<string>("");
  useEffect(() => {
    if (publicKey && signMessage && !signature) {
      (async () => {
        const item = localStorage.getItem(`xfollowx_signature_${publicKey.toString()}`);
        if (item) {
          setSignature(item);
        } else {
          const message = new TextEncoder().encode(messageText);
          try {
            const signature = bs58.encode(await signMessage(message));
            localStorage.setItem(`xfollowx_signature_${publicKey.toString()}`, signature);
            setSignature(signature);
          } catch (e) {
            console.error(e);
          }
        }
      })();
    }
  }, [publicKey, signMessage, signature]);
  useEffect(() => {
    if (!publicKey || !signature) return;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${publicKey.toString()}?pubkey=${publicKey.toString()}&signature=${signature}&message=${encodedMessage}`).then(async (response) => {
      const json = await response.json();
      setServers(json.servers || []);
      console.log(json);
      setUser({
        wallet: json.wallet,
        discord: json.discord,
        twitters: json.twitters,
        discordName: json.discordName,
        discordId: json.discordId
      });
    });
  }, [publicKey, signature]);
  useEffect(() => {
    const discord = sessionStorage.getItem("discord");
    if (discord) {
      setDiscord(JSON.parse(discord));
    }
  }, []);
  useEffect(() => {
    if (discord && publicKey && user) {
      if (discord.id !== user.discordId) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${publicKey.toString()}/discord`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              discord_id: discord.id,
              discord_name: discord.global_name,
              pubkey: publicKey.toString(),
              signature,
              message: encodedMessage
            }),
          }
        );
        setUser({ ...user, discordId: discord.id, discordName: discord.global_name });
      }
      // do somethong
    }
  }, [discord, publicKey, user]);
  const connectDiscord = async () => {
    let redirect = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/_auth`;
    const url = `https://discord.com/oauth2/authorize?client_id=1283409803833507890&response_type=code&redirect_uri=${redirect}&scope=identify`;
    window.open(url, "_blank")?.focus();
  };
  const createServer = async () => {
    if (!publicKey) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/server`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pubkey: publicKey.toString(),
          signature,
          message: encodedMessage,
        })
      }
    );
    const json = await response.json();
    setServers(servers => [...servers, json]);
  };
  const addTwitter = async () => {
    if (!twitterAdding || !publicKey) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${publicKey.toString()}/twitter/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twitter: twitterAdding,
          pubkey: publicKey.toString(),
          signature,
          message: encodedMessage,
        })
      }
    );
    if (response.status === 200) {
      setUser((user: any) => {
        return { ...user, twitters: [...user.twitters, twitterAdding] };
      });
    }
  };
  const removeTwitter = async (twitter: string) => {
    if (!publicKey) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${publicKey.toString()}/twitter/remove`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twitter,
          pubkey: publicKey.toString(),
          signature,
          message: encodedMessage,
        })
      }
    );
    if (response.status === 200) {
      setUser((user: any) => {
        return { ...user, twitters: user.twitters.filter((t: any) => t !== twitter) };
      });
    }
  };
  if (!connected) {
    return (
      <p>Connect your wallet</p>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-start mt-4 relative gap-4 px-2">
        {addingTwitter &&
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <GradientBorder>
              <div className="flex flex-col justify-center items-center p-4 gap-4">
                <p>Enter your twitter username</p>
                <StyledInput
                  placeholder="@..."
                  type="text"
                  value={twitterAdding}
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

        <div className="flex flex-col justify-center items-center gap-4 md:w-[60%]">
          <p>Your Account</p>
          <ConnectionWidget text={user?.discordName} icon="/discord.png" connected={user?.discordName} onConnect={connectDiscord} onDisconnect={() => null} canDisconnect />
          <p>Your servers</p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center items-center">
            {servers.map((server, i) => (
              <ServerWidget {...server} key={i} />
            ))}
          </div>
          <Button3 onClick={createServer} text="Create Server" />
        </div>
        <p>Your connected X accounts:</p>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 place-items-center items-center mb-2">
          {user?.twitters.map((twitter: string) => (
            <TwitterWidget username={twitter} onClick={() => removeTwitter(twitter)} />
          ))}
        </div>
        <Button3 onClick={() => setAddingTwitter(true)} text="Add Twitter" />
      </div>
    );
  }
}
