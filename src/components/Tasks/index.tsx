import { useState } from 'react';
import { Trash, Clipboard } from 'phosphor-react';

import { Input } from '../Input';
import styles from './Tasks.module.css'

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  const handleIsCompletedTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (event: React.MouseEvent, taskToRemove: Task) => {
    event.stopPropagation();
    setTasks(tasks.filter(task => task.id !== taskToRemove.id));
  }

  return (
    <div className={styles.container}>
      <Input setTasks={setTasks} />
      <div className={styles.tasksInfo}>
        <div className={styles.tasksInfoCreated}>
          <p>Tarefas criadas</p>
          <span>{tasks.length}</span>
        </div>
        <div className={styles.tasksInfoCompleted}>
          <p>Concluídas</p>
          <span>
            {tasks.length === 0 ? "0" : completedTasks + ` de ` + tasks.length}
          </span>
        </div>
      </div>
      <div className={styles.tasks}>
        {tasks.length === 0 ? (
          <EmptyTasks />
        ) : (
          tasks.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleIsCompletedTask={handleIsCompletedTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

const EmptyTasks = () => (
  <>
    <div className={styles.emptyLine}></div>
    <div className={styles.emptyContent}>
      <Clipboard size={68} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  </>
)

const TaskItem = ({
  task,
  handleIsCompletedTask,
  handleDeleteTask,
}: {
  task: Task;
  handleIsCompletedTask: (id: string) => void;
  handleDeleteTask: (event: React.MouseEvent, taskToRemove: Task) => void;
}) => {
  const { id, isCompleted, title } = task;
  const taskClass = `${styles.task} ${isCompleted ? styles.completedTask : ""}`;

  return (
    <div className={taskClass}>
      <div className={styles.content}>
        <label className={styles.customCheckbox}>
          <input onChange={() => {handleIsCompletedTask(id)}} type="checkbox" checked={task.isCompleted} />
          <span className={styles.checkmark}></span>
        </label>
        <p className={styles.title}>{title}</p>
      </div>
      <Trash size={16} onClick={(event) => handleDeleteTask(event, task)} />
    </div>
  );
};