import { useState } from 'react';
import { Trash } from 'phosphor-react';

import { Input } from '../Input';
import styles from './Tasks.module.css'

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleIsCompletedTask(taskToToggle: Task) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskToToggle.id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleDeleteTask(taskToRemove: Task) {
    const removedTask = tasks.filter(task => task.id !== taskToRemove.id);
    setTasks(removedTask);
  }

  return (
    <>
      <Input tasks={tasks} setTasks={setTasks}/>
      <div className={styles.tasks}>
        {tasks.map(( task: Task ) => {
          return (
            <div className={styles.task} key={task.id}>
              <div className={styles.content} onClick={() => handleIsCompletedTask(task)}>
                <input 
                  type='checkbox' 
                  checked={task.isCompleted}
                  onChange={() => handleIsCompletedTask(task)}
                />
                <p className={styles.title}>{task.title}</p>
              </div>
              <Trash size={24} onClick={() => handleDeleteTask(task)}/>
            </div>
          )
        })}
      </div>
    </>
  )
}