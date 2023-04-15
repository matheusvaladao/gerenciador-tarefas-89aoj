import moment from 'moment';
import type { NextPage } from 'next';
import { Task } from '../types/Task';

type ItemProps = {
    task: Task,
    endTask(task: Task): void
}

export const Item: NextPage<ItemProps> = ({ task, endTask }) => {

    const isTaskFinished = task.finishDate || false;

    return (
        <div className={'container-item' + (isTaskFinished ? '' : ' active')}>
            <img onClick={() => endTask(task)} src={isTaskFinished ? 'checked.svg' : 'not-checked.svg'} alt={isTaskFinished ? 'Tarefa em aberto' : 'Tarefa concluída'} />
            <div>
                <p className={isTaskFinished ? 'finished' : ''}>{task.name}</p>
                <span>{
                    isTaskFinished ?
                        "Concluído em: " + moment(task.finishDate).format('DD/MM/yyyy') :
                        "Conclusão em: " + moment(task.finishPrevisionDate).format('DD/MM/yyyy')
                }</span>
            </div>
        </div>
    );
}