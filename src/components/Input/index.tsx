import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Task } from '../Tasks';
import styles from './Input.module.css'

interface InputProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[] | []>>
}

export function Input({ tasks, setTasks }: InputProps) {
  const [newText, setNewText] = useState('');

  function handleAddNewTask() {
    const newTask = {
      id: uuidv4(),
      title: newText,
      isCompleted: false,
    }
    setTasks([...tasks, newTask])
    setNewText('')
  }

  return (
    <>
      <div className={styles.input}>
        <input 
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder='Adicione uma nova tarefa'
        />
        <button 
          onClick={handleAddNewTask}
        />
      </div>
    </>
  )
}