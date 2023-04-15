import { useState } from 'react';
import { NextPage } from "next";
import { Header } from "@/components/Header"
import { Filter } from '@/components/Filter';
import { Footer } from '@/components/Footer';

type HomeProps = {
    setAccessToken(s: string): void
}

export const Home: NextPage<HomeProps> = ({ setAccessToken }) => {

    const [previsionDateStart, setPrevisionDateStart] = useState('');
    const [previsionDateEnd, setPrevisionDateEnd] = useState('');
    const [status, setStatus] = useState(0);

    return (
        <>
            <Header setAccessToken={setAccessToken} />
            <Filter
                previsionDateStart={previsionDateStart}
                setPrevisionDateStart={setPrevisionDateStart}
                previsionDateEnd={previsionDateEnd}
                setPrevisionDateEnd={setPrevisionDateEnd}
                status={status}
                setStatus={setStatus}
            />
            <Footer />
        </>
    );
}