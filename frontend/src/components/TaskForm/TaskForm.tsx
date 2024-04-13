import React, { useContext, useState } from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';
import { baseUrl, onChange } from '../../utils';
import { Task, clickEvent } from '../../types';
import TokenContext from '../../context/TokensContext';
import TasksContext from '../../context/TasksContext';
import './TaskForm.css';

const TaskForm = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [createButtonClicked, setCreateButtonClicked] = useState<boolean>(false);
  
  const {accessToken} = useContext(TokenContext);
  const {tasks, setTasks} = useContext(TasksContext);

  const onCreate = (event: clickEvent) => {
    if (title && description) {
      setCreateButtonClicked(true);
  
      const headers = {
        "Authorization": `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      fetch(`${baseUrl}/api/tasks/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title,
          description,
          completed: false
        })
      })
      .then((response) => response.json() as Promise<Task>)
      .then((task) => {
        setTasks([task, ...tasks]);
      })
      .finally(() => {
        setCreateButtonClicked(false);
        setTitle('');
        setDescription('');
      });
    }
  }

  return (
    <div className="form">
      <Input
      onChange={event => onChange(event, setTitle)}
      placeholder='Title'
      disabled={createButtonClicked}
      value={title} />

      <Input 
      onChange={event => onChange(event, setDescription)}
      placeholder='Description'
      disabled={createButtonClicked}
      value={description}/>

      <Button onClick={onCreate} disabled={createButtonClicked}>Create</Button>
      <hr className='form__delimiter' />
    </div>
  )
}

export default TaskForm;