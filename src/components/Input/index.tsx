import React, { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';

import { Task } from '../Tasks';
import styles from './Input.module.css'

interface InputProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[] | []>>
}

export const Input: React.FC<InputProps> = ({ setTasks }) => {
  const [newText, setNewText] = useState('');

  const handleAddNewTask = useCallback(() => {
    if (newText.length === 0) {
      return alert('Insira uma descrição da nova tarefa')
    }
    const newTask = {
      id: uuidv4(),
      title: newText,
      isCompleted: false,
    }
    setTasks(prevTasks => [...prevTasks, newTask])
    setNewText('')
  }, [newText, setTasks]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value)
  }, []);

  return (
    <div className={styles.input}>
      <input 
        value={newText}
        onChange={handleInputChange}
        placeholder='Adicione uma nova tarefa'
      />
      <button 
        onClick={handleAddNewTask}
      >
        Criar
        <PlusCircle size={16}/>
      </button>
    </div>
  )
};