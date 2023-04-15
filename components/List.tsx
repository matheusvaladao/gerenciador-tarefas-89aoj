import type { NextPage } from 'next';
import { Item } from './Item';
import { executeRequest } from '@/services/api';
import { Task } from '@/types/Task';

type ListProps = {
    list: Array<any>,
    getList(): void
}

export const List: NextPage<ListProps> = ({ list, getList }) => {

    const endtask = async (task: Task) => {

        try {
            task.finishDate = new Date();
            await executeRequest('task?id=' + task._id, 'PUT', task);
            await getList();

        } catch (e: any) {
            console.log('Ocorreu erro ao finalizar tarefa:', e);

        }

    }

    return (

        <div className={'container-list' + (list && list.length > 0 ? ' not-empty' : '')}>
            {
                list && list.length > 0
                    ? list.map(i => <Item key={i._id} task={i} endTask={endtask} />)
                    :
                    <>
                        <img src="/empty.svg" alt='Nenhum registro encontrado' />
                        <p>Você ainda não possui tarefas cadastradas!</p>
                    </>
            }
        </div>

    );
}