import { Home } from "@/containers/Home";
import { Login } from "@/containers/Login";
import { useEffect, useState } from "react";

export default function Index() {

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
      if(typeof window !== 'undefined'){
        const token = localStorage.getItem('accessToken');
        if(token){
          return setAccessToken(token);
        }
        setAccessToken('');
      }
  }, []);

  if(accessToken === null){
    return <></>
  }

  return (
      accessToken ? <Home setAccessToken={setAccessToken} /> : <Login setAccessToken={setAccessToken} />      
  )
}
