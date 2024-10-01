import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
const CLIENT_ID = "1283409803833507890";

export default function Auth() {
    const router = useRouter();
    const [error, setError] = useState("");
    useEffect(() => {
        if (!router.isReady) return;
        (async () => {
            const code = router.query.code;
            if (code) {
                const REDIRECT_URL = `${process.env.NEXT_PUBLIC_MINI_REDIRECT_URL}/_auth`;
                const formData = new URLSearchParams({
                    client_id: CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
                    grant_type: "authorization_code",
                    code: code.toString(),
                    redirect_uri: REDIRECT_URL,
                });
                const output = await axios.post(`https://discord.com/api/v10/oauth2/token`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }
                );
                if (output.data) {
                    const access = output.data.access_token;
                    const refresh = output.data.refresh_token;
                    const userInfo = await axios.get("https://discord.com/api/v10/users/@me",
                        {
                            headers: {
                                "Authorization": `Bearer ${access}`
                            }
                        }
                    );
                    console.log(userInfo.data);
                    setError("");
                    window.sessionStorage.setItem("discord", JSON.stringify(userInfo.data));
                    window.sessionStorage.setItem("discord_access_token", access);
                    window.sessionStorage.setItem("discord_refresh_token", refresh);
                    window.location.href = "/";
                }
            } else {
                setError("error");
            }
        })();
    }, [router, router.isReady]);
    return (
        <>
            <div className="pt-24" > </div>
            {
                error &&
                <div className="p-4 mb-1.5 bg-white shadow rounded-xl duration-300" >
                    <p className="text-red-500 text-center " > {error} </p>
                </div>
            }
        </>
    );
}