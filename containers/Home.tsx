import { Header } from "@/components/Header"
import { NextPage } from "next";

type HomeProps = {
    setAccessToken(s: string) : void
}

export const Home : NextPage<HomeProps> = ({setAccessToken}) => {

    return (
        <Header setAccessToken={setAccessToken}/>
    );
}