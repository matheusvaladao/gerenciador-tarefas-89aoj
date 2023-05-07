import type { NextPage } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { executeRequest } from "../services/api";
import { Modal } from "react-bootstrap";
import { Filter } from "@/components/Filter";
import { List } from "@/components/List";

type HomeProps = {
    setAccessToken(s: string): void
}

export const Home: NextPage<HomeProps> = ({ setAccessToken }) => {

    const [previsionDateStart, setPrevisionDateStart] = useState('');
    const [previsionDateEnd, setPrevisionDateEnd] = useState('');
    const [status, setStatus] = useState(0);
    const [list, setList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState('');
    const [finishPrevisionDate, setFinishPrevisionDate] = useState('');

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

    useEffect(() => {
        getList();
    }, [previsionDateStart, previsionDateEnd, status]);

    const closeModal = () => {
        setShowModal(false);
        setName('');
        setFinishPrevisionDate('');
    }

    const doSave = async () => {
        try {
            setErrorMsg('');
            if (!name || !finishPrevisionDate) {
                setErrorMsg('Favor preencher os campos!');
                return
            }

            setLoading(true);

            const body = {
                name,
                finishPrevisionDate
            };

            await executeRequest('task', 'post', body);
            await getList();
            closeModal();
        } catch (e: any) {
            console.log(`Erro ao criar tarefa: ${e}`);
            if (e?.response?.data?.error) {
                setErrorMsg(e.response.data.error);
            } else {
                setErrorMsg(`Erro ao criar tarefa, tente novamente.`);
            }
        }

        setLoading(false);
    }

    return (
        <>
            <Header setAccessToken={setAccessToken} showModal={() => setShowModal(true)} />
            <Filter
                previsionDateStart={previsionDateStart}
                setPrevisionDateStart={setPrevisionDateStart}
                previsionDateEnd={previsionDateEnd}
                setPrevisionDateEnd={setPrevisionDateEnd}
                status={status}
                setStatus={setStatus}
            />
            <List list={list} getList={getList} />
            <Footer showModal={() => setShowModal(true)} />
            <Modal
                show={showModal}
                onHide={closeModal}
                className="container-modal">
                <Modal.Body>
                    <p>Adicionar uma tarefa</p>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <input type='text' placeholder="Nome da tarefa"
                        value={name} onChange={e => setName(e.target.value)} />
                    <input type='date' placeholder="Previsão de conclusão"
                        value={finishPrevisionDate} onChange={e => setFinishPrevisionDate(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <div className="button col-12">
                        <button onClick={doSave}>{loading ? '...Carregando' : 'Salvar'}</button>
                        <span onClick={closeModal}>Cancelar</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}