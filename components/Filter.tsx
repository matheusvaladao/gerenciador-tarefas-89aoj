import type { NextPage } from 'next';

type FilterProps = {
    previsionDateStart: string,
    setPrevisionDateStart(s: string): void,
    previsionDateEnd: string,
    setPrevisionDateEnd(s: string): void,
    status: number,
    setStatus(n: number): void
}

export const Filter: NextPage<FilterProps> = ({
    previsionDateStart,
    setPrevisionDateStart,
    previsionDateEnd,
    setPrevisionDateEnd,
    status,
    setStatus
}) => {


    return (
        <div className='container-filter'>

            <div className='title'>
                <span>Tarefas</span>
                <img src='/filter.svg' alt='Filtrar tarefas' />
                <div className='form'>
                    <div>
                        <label>Data prevista de conclusão:</label>
                        <input type="date" value={previsionDateStart} onChange={e => setPrevisionDateStart(e.target.value)} />
                    </div>
                    <div>
                        <label>até</label>
                        <input type="date" value={previsionDateEnd} onChange={e => setPrevisionDateEnd(e.target.value)} />
                    </div>
                    <div className='separator' />
                    <div>
                        <label>Status</label>
                        <select value={status} onChange={e => setStatus(parseInt(e.target.value))}>
                            <option value={0}>Todas</option>
                            <option value={1}>Ativas</option>
                            <option value={2}>Concluídas</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    );
}