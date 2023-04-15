import { useState, useEffect } from 'react';
import { NextPage } from "next";
import { Header } from "@/components/Header"
import { Filter } from '@/components/Filter';
import { Footer } from '@/components/Footer';
import { executeRequest } from '../services/api';
import { List } from '@/components/List';

type HomeProps = {
    setAccessToken(s: string): void
}

export const Home: NextPage<HomeProps> = ({ setAccessToken }) => {

    const [previsionDateStart, setPrevisionDateStart] = useState('');
    const [previsionDateEnd, setPrevisionDateEnd] = useState('');
    const [status, setStatus] = useState(0);
    const [list, setList] = useState([]);

    useEffect(() => {
        getList();
    },
        [previsionDateStart, previsionDateEnd, status]
    );

    const getList = async () => {

        try {

            let filters = '?status=' + status;

            if (previsionDateStart) {
                filters += '&finishPrevisionStart=' + previsionDateStart;
            }

            if (previsionDateEnd) {
                filters += '&finishPrevisionEnd=' + previsionDateEnd;
            }

            const result = await executeRequest('task' + filters, 'GET');

            if (result && result.data) {
                setList(result.data);
            }

        } catch (e: any) {
            console.log('Erro ao obter tarefas:', e);
        }

    }

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
            <List list={list} getList={getList} />
            <Footer />
        </>
    );
}